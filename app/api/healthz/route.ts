import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const paste = await redis.get(`paste:${params.id}`);

  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(paste);
}
