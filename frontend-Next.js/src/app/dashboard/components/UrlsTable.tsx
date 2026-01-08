"use client";

import { useState } from "react";
import { Copy, MoreVertical, BarChart2, Trash2 } from "lucide-react";
import { useUrls } from "@/hooks/useUrls";
import AnalyticsPanel from "./AnalyticsPanel";

export default function UrlList({ urls }: { urls: any[] }) {
  const { deleteUrl } = useUrls();
  const [activeAnalyticsId, setActiveAnalyticsId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);


  const copyToClipboard = (id: number, shortCode: string) => {
    navigator.clipboard.writeText(
      `http://localhost:3002/${shortCode}`
    );

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };


  const toggleAnalytics = (id: number) => {
    setActiveAnalyticsId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {urls.map((url) => (
        <div key={url.id}>
          <div className="bg-white rounded-xl border p-4 flex justify-between gap-4">
            {/* LEFT */}
            <div className="flex gap-4">
              {/* ICON */}
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-semibold">
                {new URL(url.originalUrl).hostname[0].toUpperCase()}
              </div>

              {/* CONTENT */}
              <div>
                <p className="font-medium">
                  {new URL(url.originalUrl).hostname} — untitled
                </p>

                {/* SHORT URL + COPY */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-blue-600 font-medium">
                    http://localhost:3002/{url.shortCode}
                  </span>

                  <button
                    onClick={() => copyToClipboard(url.id, url.shortCode)}
                    className="text-gray-500 hover:text-black cursor-pointer"
                    title="Copy"
                  >
                    <Copy size={16} />
                  </button>
                </div>
     
                {copiedId === url.id && (
                  <p className="text-green-600 text-xs mt-1">
                    ✔ Copied to clipboard
                  </p>
                )}


                {/* LONG URL */}
                <p className="text-sm text-gray-500 truncate max-w-xl mt-1">
                  ↳ {url.originalUrl}
                </p>

                {/* META */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span>🔒 Click data</span>
                  <span>
                    📅 {new Date(url.createdAt).toLocaleDateString()}
                  </span>
                  <span>🏷 No tags</span>
                </div>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleAnalytics(url.id)}
                className={`hover:text-black cursor-pointer ${
                  activeAnalyticsId === url.id
                    ? "text-black"
                    : "text-gray-500"
                }`}
                title="Analytics"
              >
                <BarChart2 size={18} />
              </button>

              <button
                onClick={() =>
                  deleteUrl(url.id).then(() => window.location.reload())
                }
                className="text-gray-500 hover:text-red-500 cursor-pointer"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {activeAnalyticsId === url.id && (
            <div className="mt-4 ml-14">
              <AnalyticsPanel urlId={url.id} />
            </div>
          )}
        </div>
      ))}

      {urls.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No URLs created yet
        </p>
      )}
    </div>
  );
}
