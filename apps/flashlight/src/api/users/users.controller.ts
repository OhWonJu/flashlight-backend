import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { CreateUserDTO, getMeDTO } from "@lib/crud/user/dto";

import { MutationResponse } from "decorators/types/mutationResopnse";

import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 유저 생성
  @Post("/create")
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<MutationResponse> {
    return await this.usersService.createUser(createUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get("/me")
  async getMe(@Request() req): Promise<getMeDTO | undefined> {
    return await this.usersService.getMe(req.user.sub); // user.id
  }

  @UseGuards(AuthGuard)
  @Delete("/delete")
  async deleteUser(@Request() req): Promise<MutationResponse> {
    return await this.usersService.deleteUser(req.user.sub);
  }
}
