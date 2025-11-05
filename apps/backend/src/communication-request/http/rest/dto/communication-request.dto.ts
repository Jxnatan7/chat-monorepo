import {
  CommunicationRequest,
  CommunicationStatus,
} from "src/communication-request/core/schemas/communication-request.schema";
import { UserRole } from "src/user/core/schemas/user.schema";

export class CommunicationRequestDto {
  private readonly id: string;
  private readonly visitorName: string;
  private readonly visitorContact: string;
  private readonly initialMessage: string;
  private readonly houseId: string;
  private readonly providerId: string;
  private readonly status: CommunicationStatus;
  private readonly visitorId: string;
  private readonly visitorToken: string;
  private readonly visitorRole: UserRole;
  private readonly chatId: string;

  private constructor({
    id,
    visitorName,
    visitorContact,
    initialMessage,
    houseId,
    providerId,
    status,
    visitorId,
    visitorToken,
    role,
    chatId,
  }) {
    this.id = id;
    this.visitorName = visitorName;
    this.visitorContact = visitorContact;
    this.initialMessage = initialMessage;
    this.houseId = houseId;
    this.providerId = providerId;
    this.status = status;
    this.visitorId = visitorId;
    this.visitorToken = visitorToken;
    this.visitorRole = role;
    this.chatId = chatId;
  }

  public static create(data: CommunicationRequest): CommunicationRequestDto {
    if (
      !data.visitorName ||
      !data.initialMessage ||
      !data.providerId ||
      data.status === undefined ||
      !data.visitorId ||
      !data.visitorToken
    ) {
      throw new Error("Dados inválidos para criar CommunicationRequestDto.");
    }

    return new CommunicationRequestDto({
      id: String(data.id),
      visitorName: data.visitorName,
      visitorContact: data.visitorContact,
      initialMessage: data.initialMessage,
      houseId: data.houseId?.toString(),
      providerId: data.providerId?.toString(),
      status: data.status,
      visitorId: data.visitorId,
      visitorToken: data.visitorToken,
      role: UserRole.VISITOR,
      chatId: data.chatId,
    });
  }
}
