import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "../schemas/message.schema";
import {
  createMongoQueryService,
  FilterRequest,
  PaginatedResult,
} from "src/@core/services/mongo-query.service";
import { UserJwt } from "src/helpers/user.decorator";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async getMessagesByChatId(
    chatId: string,
    filterRequest: FilterRequest,
    user: UserJwt,
  ): Promise<PaginatedResult<MessageDocument>> {
    const baseQuery = { chatId: chatId };
    const query = createMongoQueryService<MessageDocument>(this.messageModel);
    const result = await query.search({
      baseQuery,
      filterRequest,
      options: {
        dateField: "timestamp",
      },
    });

    const messages: any = result.items.map((message: any) => {
      return {
        ...message._doc,
        isMyMessage: message.sender.userId === user.id,
      };
    });

    messages.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateA - dateB;
    });

    result.items = messages;
    return result;
  }
}
