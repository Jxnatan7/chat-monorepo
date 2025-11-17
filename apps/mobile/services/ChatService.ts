import axiosClient from "@/api/axiosClient";

export default class ChatService {
  api = axiosClient;

  static async getMessages(chatId: string) {
    const response = await axiosClient.get(`/chats/${chatId}/messages`);
    return response.data;
  }
}
