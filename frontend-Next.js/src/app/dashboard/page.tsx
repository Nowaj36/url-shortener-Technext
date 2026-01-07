import apiClient from "@/lib/api-client";
import CreateUrlCard from "./components/CreateUrlCard";
import UrlTable from "./components/UrlsTable";

export default async function DashboardPage() {
  const { data } = await apiClient.get("/urls");
  console.log("Fetched URLs:", data);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <CreateUrlCard />

      <UrlTable urls={data} />
    </div>
  );
}
