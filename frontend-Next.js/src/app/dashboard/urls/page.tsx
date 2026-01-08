import apiClient from "@/lib/api-client";
import UrlTable from "../components/UrlsTable";

export default async function UrlListPage() {
  const { data } = await apiClient.get("/urls");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Your URLs
      </h1>

      <UrlTable urls={data} />
    </div>
  );
}
