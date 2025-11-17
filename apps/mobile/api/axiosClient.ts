import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.EXPO_PUBLIC_API_URL || "https://f3d7a2d04af5.ngrok-free.app/api";

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
