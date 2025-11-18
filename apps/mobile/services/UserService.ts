import axiosClient from "@/api/axiosClient";

export default class UserService {
  api = axiosClient;

  static async findById(id: string) {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  }

  static async update(id: string, payload: any) {
    const response = await axiosClient.put(`/users/${id}`, payload);
    return response.data;
  }
}
