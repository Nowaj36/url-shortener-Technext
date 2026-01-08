"use client";

import { useState } from "react";
import { useUrls } from "@/hooks/useUrls";
import AnalyticsPanel from "./AnalyticsPanel";

export default function UrlTable({ urls }: { urls: any[] }) {
  const { deleteUrl } = useUrls();
  const [selectedUrlId, setSelectedUrlId] = useState<number | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Original URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {urls.map((url) => (
              <tr key={url.id} className="border-t">
                <td className="p-3 truncate max-w-xs">
                  {url.originalUrl}
                </td>

                <td
                  className="text-blue-600 cursor-pointer"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `http://localhost:3002/${url.shortCode}`
                    )
                  }
                >
                  http://localhost:3002/{url.shortCode}
                </td>

                <td>{url.clicks}</td>

                <td>
                  {new Date(url.createdAt).toLocaleDateString()}
                </td>

                <td className="space-x-3">
                  <button
                    onClick={() => setSelectedUrlId(url.id)}
                    className="text-blue-600"
                  >
                    Analytics
                  </button>

                  <button
                    onClick={() =>
                      deleteUrl(url.id).then(() => window.location.reload())
                    }
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {urls.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No URLs created yet
          </p>
        )}
      </div>

      {selectedUrlId && (
        <div className="mt-6">
          <AnalyticsPanel urlId={selectedUrlId} />
        </div>
      )}
    </>
  );
}
