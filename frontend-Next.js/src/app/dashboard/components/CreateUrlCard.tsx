"use client";

import { useState } from "react";
import { useUrls } from "@/hooks/useUrls";
import toast from "react-hot-toast";
import UpgradeBanner from "./UpgradeBanner";

export default function CreateUrlCard() {
  const [longUrl, setLongUrl] = useState("");
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { createUrl } = useUrls();

  const handleCreate = async () => {
    if (!longUrl) return;

    setLoading(true);
    setUpgradeMessage(null);

    try {
      await createUrl(longUrl);

      toast.success("URL created successfully", { duration: 3000 });
      setLongUrl("");
      window.location.reload();
    } catch (error: any) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.code === "LIMIT_REACHED"
      ) {
        setUpgradeMessage(error.response.data.message);
      } else {
        toast.error("Sumthing went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {upgradeMessage && (
        <UpgradeBanner message={upgradeMessage} />
      )}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-medium mb-3">
          Create Short URL
        </h2>

        <div className="flex gap-3">
          <input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 border px-4 py-2 rounded-lg"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-black text-white px-6 rounded-lg cursor-pointer"
          >
            {loading ? "Creating..." : "Shorten"}
          </button>
        </div>
      </div>
    </div>
  );
}
