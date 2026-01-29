import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  
  if (!body?.content || typeof body.content !== "string" || body.content.trim() === "") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const { content, ttl_seconds, max_views } = body;

  if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return NextResponse.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
    return NextResponse.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const id = nanoid(8);
  const now = Date.now();

  const expires_at = ttl_seconds ? now + ttl_seconds * 1000 : null;

  await redis.set(`paste:${id}`, {
    content,
    created_at: now,
    expires_at,
    max_views: max_views ?? null,
    views: 0,
  });

  return NextResponse.json({
    id,
    url: `${req.headers.get("origin")}/p/${id}`,
  });
}

