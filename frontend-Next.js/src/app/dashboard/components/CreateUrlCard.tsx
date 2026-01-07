"use client";

import { useState } from "react";
import { useUrls } from "@/hooks/useUrls";

export default function CreateUrlCard() {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUrl } = useUrls();

  const handleCreate = async () => {
    if (!longUrl) return;

    setLoading(true);
    await createUrl(longUrl);
    setLongUrl("");
    setLoading(false);

    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-medium mb-3">Create Short URL</h2>

      <div className="flex gap-3">
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          className="flex-1 border px-4 py-2 rounded-lg"
        />
        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-black text-white px-6 rounded-lg"
        >
          {loading ? "Creating..." : "Shorten"}
        </button>
      </div>
    </div>
  );
}
