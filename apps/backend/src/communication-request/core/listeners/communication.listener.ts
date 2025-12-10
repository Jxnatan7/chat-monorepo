import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ChatGateway } from "src/chat/gateways/chat.gateway";
import { CommunicationRequestCreatedEvent } from "../events/communication-request-created.event";

@Injectable()
export class CommunicationEventListener {
  private readonly logger = new Logger(CommunicationEventListener.name);

  constructor(private readonly chatGateway: ChatGateway) {}

  @OnEvent("communication.created", { async: true })
  async handleCommunicationCreatedEvent(
    event: CommunicationRequestCreatedEvent,
  ) {
    this.logger.log(`Evento recebido: Nova request ${event.payload.id}`);

    event.residentsIds.forEach((residentId) => {
      try {
        this.chatGateway.notifyNewCommunicationRequest(
          residentId,
          event.payload,
        );
      } catch (error) {
        this.logger.error("Erro ao notificar via socket", error);
      }
    });
  }
}
