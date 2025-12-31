import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/core/services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { SimpleUser } from "../dto/simple-user.dto";

@Controller("api/users")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserRequest: CreateUserDto) {
    const user = await this.userService.create(createUserRequest);
    return SimpleUser.createFromUser(user);
  }

  @Get("/:id")
  async findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() payload: CreateUserDto) {
    return this.userService.update(id, payload);
  }
}
