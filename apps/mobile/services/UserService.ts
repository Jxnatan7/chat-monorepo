import axiosClient from "@/api/axiosClient";

export default class UserService {
  api = axiosClient;

  static async findById(id: string) {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  }
}
