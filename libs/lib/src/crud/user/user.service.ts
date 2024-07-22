import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { DatabaseService } from "@lib/database/database.service";

import { MutationResponse } from "decorators/types/mutationResopnse";

import { CreateUserDTO, getMeDTO } from "./dto";

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  private async checkUserExist(id: string): Promise<boolean> {
    const existUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return existUser !== null;
  }

  private async saveUser(createUserDTO: CreateUserDTO) {
    const { email, imageUrl, name, userId } = createUserDTO;

    const newUser = this.prisma.user.create({
      data: { email, imageUrl, name, userId },
    });

    await this.prisma.$transaction([newUser]);
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<MutationResponse> {
    try {
      await this.saveUser(createUserDTO);
      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return { ok: false, error: "create new user failed" };
    }
  }

  async getMe(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<getMeDTO | undefined> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    });
  }

  // deletUser
  async deletUser(id: string): Promise<MutationResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      return {
        ok: false,
        error: "user not exist",
      };

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    const userExist = await this.checkUserExist(id);

    if (userExist) {
      return {
        ok: false,
        error: "failed delete user",
      };
    } else {
      return { ok: true };
    }
  }
}
