import axiosClient from "@/api/axiosClient";

export default class HouseService {
  api = axiosClient;

  static async findByProviderId(providerId: string) {
    return (await axiosClient.post(`/houses/provider/${providerId}`)).data;
  }

  static async create(payload: any) {
    return (await axiosClient.post("/houses", payload)).data;
  }

  static async update(id: string, payload: any) {
    return (await axiosClient.put(`/houses/${id}`, payload)).data;
  }

  static async findByUser() {
    return (await axiosClient.post(`/houses/me`)).data;
  }
}
