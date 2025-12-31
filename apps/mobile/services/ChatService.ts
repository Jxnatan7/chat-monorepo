import axiosClient from "@/api/axiosClient";

export default class ChatService {
  api = axiosClient;

  static async getMessages(chatId: string) {
    const response = await axiosClient.post(`/messages/${chatId}`, {
      page: 1,
      pageSize: 100,
      sortDirection: "desc",
    });
    return response.data;
  }
}
