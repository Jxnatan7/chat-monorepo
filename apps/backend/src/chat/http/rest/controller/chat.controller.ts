import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ChatService } from "src/chat/core/services/chat.service";

@Controller("api/chats")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":id/messages")
  @UseGuards(AuthGuard("jwt"))
  async getMessages(@Param("id") id: string) {
    return this.chatService.getMessages(id);
  }
}
