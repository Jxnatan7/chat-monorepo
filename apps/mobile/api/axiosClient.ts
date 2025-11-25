import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";

const baseURL =
  `${process.env.EXPO_PUBLIC_API_URL}/api` ||
  "https://f3d7a2d04af5.ngrok-free.app/api";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    const visitorToken = useCommunicationRequestStore.getState().visitorToken;

    if (token || visitorToken) {
      config.headers.Authorization = `Bearer ${token || visitorToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
