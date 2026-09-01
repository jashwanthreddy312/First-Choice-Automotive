import { NextResponse } from "next/server";
import { cosmosDeleteCar, cosmosUpdateCar, isCosmosConfigured } from "@/lib/cosmos";
import { Car } from "@/lib/types";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isCosmosConfigured()) {
    return NextResponse.json({ error: "not-configured" }, { status: 501 });
  }
  try {
    const { id } = await params;
    const patch = (await request.json()) as Partial<Car>;
    await cosmosUpdateCar(id, patch);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/cars/[id] failed:", err);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isCosmosConfigured()) {
    return NextResponse.json({ error: "not-configured" }, { status: 501 });
  }
  try {
    const { id } = await params;
    await cosmosDeleteCar(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/cars/[id] failed:", err);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
