import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MessageService } from "src/message/core/services/message.service";

@Controller("api/messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getMessages(@Param("id") id: string) {
    return;
  }
}
