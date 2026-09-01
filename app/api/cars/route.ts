import { NextResponse } from "next/server";
import { cosmosAddCar, cosmosGetAllCars, isCosmosConfigured } from "@/lib/cosmos";
import { Car } from "@/lib/types";

// 501 tells the client "no shared database is configured" — a normal,
// expected state before Cosmos DB is set up, and the client falls back to
// this browser's localStorage. Any other non-2xx means Cosmos IS
// configured but something actually failed, which the client treats as a
// real error instead of silently switching data sources.

export async function GET() {
  if (!isCosmosConfigured()) {
    return NextResponse.json({ error: "not-configured" }, { status: 501 });
  }
  try {
    const cars = await cosmosGetAllCars();
    return NextResponse.json(cars);
  } catch (err) {
    console.error("GET /api/cars failed:", err);
    return NextResponse.json({ error: "Failed to load cars" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isCosmosConfigured()) {
    return NextResponse.json({ error: "not-configured" }, { status: 501 });
  }
  try {
    const car = (await request.json()) as Car;
    await cosmosAddCar(car);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/cars failed:", err);
    return NextResponse.json({ error: "Failed to add car" }, { status: 500 });
  }
}
