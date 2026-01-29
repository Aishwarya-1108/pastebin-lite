"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // 🔴 REQUIRED

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      alert("Failed to create paste");
      return;
    }

    const data: { id: string; url: string } = await res.json();

    console.log("Created paste:", data); // 👈 debug
    router.push(`/p/${data.id}`); // 🔥 THIS IS KEY
  }

  return (
    <main>
      <h1>Create Paste</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Create Paste</button>
      </form>
    </main>
  );
}
