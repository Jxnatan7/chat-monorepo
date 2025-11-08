import { Controller, Post, Body, Param, UseGuards } from "@nestjs/common";
import { CommunicationRequestService } from "src/communication-request/core/services/communication-request.service";
import { CreateCommunicationRequestDto } from "src/communication-request/http/rest/dto/create-communication-request.dto";
import { CommunicationRequestDto } from "../dto/communication-request.dto";
import { AuthGuard } from "@nestjs/passport";
import { ValidateCommunicationRequestDto } from "../dto/validation-communication-request.dto";
import {
  FilterRequest,
  PaginatedResult,
} from "src/@core/services/mongo-query.service";
import { CommunicationRequest } from "src/communication-request/core/schemas/communication-request.schema";

@Controller("api/communication-requests")
export class CommunicationRequestController {
  constructor(
    private readonly communicationRequestService: CommunicationRequestService,
  ) {}

  @Post()
  async create(
    @Body() createCommunicationRequestDto: CreateCommunicationRequestDto,
  ): Promise<CommunicationRequestDto> {
    return this.communicationRequestService.create(
      createCommunicationRequestDto,
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":houseId")
  async listByHouseId(
    @Param("houseId") houseId: string,
    filterRequest: FilterRequest,
  ): Promise<PaginatedResult<CommunicationRequest>> {
    return this.communicationRequestService.listByHouseId(
      houseId,
      filterRequest,
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":id/validate")
  async validate(
    @Param("id") id: string,
    @Body() validateCommunicationRequestDto: ValidateCommunicationRequestDto,
  ): Promise<CommunicationRequestDto> {
    return this.communicationRequestService.validate(
      id,
      validateCommunicationRequestDto,
    );
  }
}
