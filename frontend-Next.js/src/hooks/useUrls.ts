"use client";

import apiClient from "@/lib/api-client";

export function useUrls() {
 
  const createUrl = async (originalUrl: string) => {
    const { data } = await apiClient.post("/urls", { originalUrl });
    return data.data;
  };

  const getUrls = async () => {
    const { data } = await apiClient.get("/urls");
    return data.data;
  };

  const deleteUrl = async (id: string) => {
    await apiClient.delete(`/urls/${id}`);
  };

  return { createUrl, getUrls, deleteUrl };
}
