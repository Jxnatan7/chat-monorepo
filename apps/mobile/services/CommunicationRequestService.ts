import axiosClient from "@/api/axiosClient";

export default class CommunicationRequestService {
  api = axiosClient;

  static async listByHouseId(houseId: string) {
    const response = await axiosClient.get(
      `/communication-requests/${houseId}`
    );
    return response.data;
  }

  static async validate(id: string, status: string) {
    const response = await axiosClient.post(
      `/communication-requests/${id}/validate`,
      { status }
    );
    return response.data;
  }

  static async create(data: any) {
    const response = await axiosClient.post("/communication-requests", data);
    return response.data;
  }
}
