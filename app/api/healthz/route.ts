import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  // Simple health check response
  return NextResponse.json({ status: "ok" });
}
