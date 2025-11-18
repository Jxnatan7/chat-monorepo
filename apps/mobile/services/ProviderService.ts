import axiosClient from "@/api/axiosClient";

export default class ProviderService {
  api = axiosClient;

  static async findByCode(code: string) {
    const response = await axiosClient.get(`/providers/code/${code}`);
    return response.data;
  }

  static async create(payload: any) {
    const response = await axiosClient.post("/providers", payload);
    return response.data;
  }

  static async update(id: string, payload: any) {
    const response = await axiosClient.put(`/providers/${id}`, payload);
    return response.data;
  }
}
