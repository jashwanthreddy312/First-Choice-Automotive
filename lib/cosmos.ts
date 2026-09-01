import "server-only";
import { Container, CosmosClient } from "@azure/cosmos";
import { SEED_CARS } from "./data";
import { Car } from "./types";

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE || "firstchoiceautomotive";
const containerId = process.env.COSMOS_CONTAINER || "cars";

export function isCosmosConfigured(): boolean {
  return Boolean(endpoint && key);
}

let containerPromise: Promise<Container> | null = null;

// Lazily connects, creates the database/container if they don't exist yet,
// and seeds it from lib/data.ts the very first time — so there's no
// separate manual migration step before the app has data to show.
function getContainer(): Promise<Container> {
  if (!isCosmosConfigured()) {
    throw new Error("Cosmos DB is not configured (missing COSMOS_ENDPOINT / COSMOS_KEY).");
  }
  if (!containerPromise) {
    containerPromise = (async () => {
      const client = new CosmosClient({ endpoint: endpoint!, key: key! });
      const { database } = await client.databases.createIfNotExists({ id: databaseId });
      const { container } = await database.containers.createIfNotExists({
        id: containerId,
        partitionKey: { paths: ["/id"] },
      });
      await ensureSeeded(container);
      return container;
    })();
  }
  return containerPromise;
}

async function ensureSeeded(container: Container) {
  const { resources } = await container.items
    .query<number>("SELECT VALUE COUNT(1) FROM c")
    .fetchAll();
  if ((resources[0] ?? 0) > 0) return;
  await Promise.all(SEED_CARS.map((car) => container.items.create(car)));
}

export async function cosmosGetAllCars(): Promise<Car[]> {
  const container = await getContainer();
  const { resources } = await container.items.query<Car>("SELECT * FROM c").fetchAll();
  return resources;
}

export async function cosmosAddCar(car: Car): Promise<void> {
  const container = await getContainer();
  await container.items.create(car);
}

export async function cosmosUpdateCar(id: string, patch: Partial<Car>): Promise<void> {
  const container = await getContainer();
  const { resource: existing } = await container.item(id, id).read<Car>();
  if (!existing) throw new Error(`Car ${id} not found`);
  await container.item(id, id).replace({ ...existing, ...patch });
}

export async function cosmosDeleteCar(id: string): Promise<void> {
  const container = await getContainer();
  await container.item(id, id).delete();
}
