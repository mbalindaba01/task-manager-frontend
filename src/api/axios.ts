import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const isAuthRequest = /\/auth\/(login|register)/.test(config.url ?? "");

    if (!isAuthRequest) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const isAuthRequest = /\/auth\/(login|register)/.test(error.config?.url ?? "");

    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.assign("/login");
    }

    return Promise.reject(error);
  }
);


export default apiClient;