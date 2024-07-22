import { Injectable } from "@nestjs/common";

import { CreateUserDTO } from "@lib/crud/user/dto";
import { UserService } from "@lib/crud/user/user.service";

import { MutationResponse } from "decorators/types/mutationResopnse";

@Injectable()
export class UsersService {
  constructor(private userService: UserService) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<MutationResponse> {
    return await this.userService.createUser(createUserDTO);
  }

  async getMe(userId: string) {
    return await this.userService.getMe({ id: userId });
  }

  async deleteUser(userId: string) {
    return await this.userService.deletUser(userId);
  }
}
