import { CommunicationRequest } from "../schemas/communication-request.schema";

export class CommunicationRequestCreatedEvent {
  constructor(
    public readonly payload: CommunicationRequest,
    public readonly residentsIds: string[],
  ) {}
}
