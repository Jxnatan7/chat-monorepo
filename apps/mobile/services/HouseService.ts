import axiosClient from "@/api/axiosClient";

export default class HouseService {
  api = axiosClient;

  static async findByProviderId(providerId: string) {
    const response = await axiosClient.get(`/houses/provider/${providerId}`);
    return response.data;
  }

  static async create(payload: any) {
    const response = await axiosClient.post("/houses", payload);
    return response.data;
  }

  static async update(id: string, payload: any) {
    const response = await axiosClient.put(`/houses/${id}`, payload);
    return response.data;
  }

  static async findByUser() {
    const response = await axiosClient.get(`/houses/me`);
    console.error(response);
    return response.data;
  }
}
