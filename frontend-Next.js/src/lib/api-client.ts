import axios from "axios";

const isBrowser = typeof window !== "undefined";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
  withCredentials: true,
});

// REQUEST: attach access token
apiClient.interceptors.request.use(async (config) => {
  let token: string | undefined;

  if (isBrowser) {
    const Cookies = (await import("js-cookie")).default;
    token = Cookies.get("access_token");
  } else {
    const { cookies } = await import("next/headers");
    token = (await cookies()).get("access_token")?.value;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE: refresh token (CLIENT ONLY)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isBrowser) return Promise.reject(error);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const Cookies = (await import("js-cookie")).default;

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        Cookies.set("access_token", data.accessToken);
        return apiClient(originalRequest);
      } catch {
        const Cookies = (await import("js-cookie")).default;
        Cookies.remove("access_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
