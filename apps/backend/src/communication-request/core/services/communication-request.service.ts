import { InjectModel } from "@nestjs/mongoose";
import {
  CommunicationRequest,
  CommunicationStatus,
} from "../schemas/communication-request.schema";
import { Model, Types } from "mongoose";
import { User, UserRole } from "src/user/core/schemas/user.schema";
import { CommunicationRequestDto } from "src/communication-request/http/rest/dto/communication-request.dto";
import { ValidateCommunicationRequestDto } from "src/communication-request/http/rest/dto/validation-communication-request.dto";
import { ChatService } from "src/chat/core/services/chat.service";
import { House } from "src/house/core/schemas/house.schema";
import { ChatGateway } from "src/chat/gateways/chat.gateway";
import { CreateCommunicationRequestDto } from "src/communication-request/http/rest/dto/create-communication-request.dto";
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import {
  createMongoQueryService,
  FilterRequest,
  PaginatedResult,
} from "src/@core/services/mongo-query.service";

@Injectable()
export class CommunicationRequestService {
  constructor(
    @InjectModel(CommunicationRequest.name)
    private readonly communicationRequestModel: Model<CommunicationRequest>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(House.name) private readonly houseModel: Model<House>,
    readonly chatService: ChatService,
    // @Inject(forwardRef(() => ChatGateway))
    private readonly chatGateway: ChatGateway, // injeta gateway para emitir
  ) {}

  async create(
    requestData: CreateCommunicationRequestDto,
  ): Promise<CommunicationRequestDto> {
    const savedRequest = await this.saveCommunicationRequest(requestData);
    const userSaved = await this.attachRequestToUser(savedRequest);
    const updatedRequest = await this.attachUserToRequest(
      savedRequest.id as string,
      userSaved,
    );

    return CommunicationRequestDto.create(updatedRequest);
  }

  // async listByHouseId(houseId: string): Promise<CommunicationRequestDto[]> {
  //   const communicationRequests = await this.communicationRequestModel
  //     .find({ houseId })
  //     .exec();

  // return communicationRequests.map((request) =>
  //   CommunicationRequestDto.create(request),
  // );
  // }

  async listByHouseId(
    houseId: string,
    filterRequest: FilterRequest,
  ): Promise<PaginatedResult<CommunicationRequest>> {
    const baseQuery = { houseId: houseId };
    const query = createMongoQueryService<CommunicationRequest>(
      this.communicationRequestModel,
    );
    return query.search({
      baseQuery,
      filterRequest,
      options: {
        // searchableFields: ["content", "sender.name", "sender.displayName", "sender.email"],
        dateField: "createdAt",
      },
    });
  }

  async validate(
    id: string,
    validateCommunicationRequestDto: ValidateCommunicationRequestDto,
  ) {
    const communicationRequest = await this.communicationRequestModel
      .findByIdAndUpdate(
        id,
        { $set: { status: validateCommunicationRequestDto.status } },
        { new: true },
      )
      .exec();

    if (!communicationRequest) {
      throw new NotFoundException("Communication request not found");
    }

    if (communicationRequest.status !== CommunicationStatus.ACCEPTED) {
      return CommunicationRequestDto.create(communicationRequest);
    }

    if (communicationRequest.chatId) {
      const existing = await this.communicationRequestModel.findById(id).exec();
      return CommunicationRequestDto.create(existing as CommunicationRequest);
    }

    const house = await this.houseModel.findById(communicationRequest.houseId);

    if (!house) {
      throw new NotFoundException("House not found");
    }

    if (!house.residents || house.residents.length === 0) {
      throw new BadRequestException("House has no residents");
    }

    const residentUserId = house.residents[0].toString();

    if (!communicationRequest.visitorId) {
      throw new BadRequestException("CommunicationRequest has no visitorId");
    }

    const visitorId = communicationRequest.visitorId.toString();

    const distinctParticipants = Array.from(
      new Set([residentUserId, visitorId]),
    );

    if (distinctParticipants.length > 2) {
      throw new BadRequestException("Too many distinct participants");
    }

    const createdChat = await this.chatService.createChat(
      String(communicationRequest.id),
      distinctParticipants,
    );

    try {
      this.chatGateway.emitToUser(visitorId, "communication_accepted", {
        communicationRequestId: id,
        chatId: String(createdChat._id),
      });
    } catch (err) {}

    const updated = await this.communicationRequestModel.findById(id).exec();
    return CommunicationRequestDto.create(updated as CommunicationRequest);
  }

  private async saveCommunicationRequest(
    requestData: CreateCommunicationRequestDto,
  ): Promise<CommunicationRequest> {
    const communicationRequest = new this.communicationRequestModel(
      requestData,
    );
    return communicationRequest.save();
  }

  private async attachRequestToUser(
    communicationRequest: CommunicationRequest,
  ): Promise<User> {
    const createVisitorUserRequest = {
      name: communicationRequest.visitorName,
      role: UserRole.VISITOR,
      communicationRequestId: communicationRequest.id as Types.ObjectId,
    };
    const user = new this.userModel(createVisitorUserRequest);
    return user.save();
  }

  private async attachUserToRequest(
    id: string,
    user: User,
  ): Promise<CommunicationRequest> {
    const updatedCommunicationRequest = await this.communicationRequestModel
      .findByIdAndUpdate(
        id,
        { $set: { visitorId: user.id, visitorToken: user.token } },
        { new: true },
      )
      .exec();

    if (!updatedCommunicationRequest) {
      throw new Error("Failed to update communication request");
    }
    return updatedCommunicationRequest;
  }
}
