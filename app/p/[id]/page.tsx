import { headers } from "next/headers";

interface Paste {
  content: string;
  created_at: number;
  expires_at: number | null;
  max_views: number | null;
  views: number;
}

async function getPaste(id: string): Promise<Paste | null> {
  if (!id) return null;

  const h = await headers();
  const host = h.get("host");
  if (!host) return null;

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ UNWRAP params
  const { id } = await params;

  const paste = await getPaste(id);

  if (!paste) {
    return <h1>404 – Paste unavailable</h1>;
  }

  return (
    <pre
      style={{
        padding: "1rem",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {paste.content}
    </pre>
  );
}
