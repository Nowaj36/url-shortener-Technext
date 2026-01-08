"use client";

import apiClient from "@/lib/api-client";

export function useAnalytics() {
  const getUrlAnalytics = async (urlId: number) => {
    const { data } = await apiClient.get(`/analytics/urls/${urlId}`);
    return data;
  };

  return { getUrlAnalytics };
}
