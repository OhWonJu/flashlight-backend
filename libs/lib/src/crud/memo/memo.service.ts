import { Injectable } from "@nestjs/common";
import { Memo, Prisma } from "@prisma/client";

import { DatabaseService } from "@lib/database/database.service";

import { MutationResponse } from "decorators/types/mutationResopnse";

import { CreateMemoDTO, GetMemosDTO, UpdateMemoDTO } from "./dto";

@Injectable()
export class MemoService {
  constructor(private prisma: DatabaseService) {}

  private async checkMemoExist(id: string): Promise<boolean> {
    const existMemo = await this.prisma.memo.findUnique({
      where: { id },
    });

    return existMemo !== null;
  }

  private async saveMemo(createMemoDTO: CreateMemoDTO) {
    const { content, coverImage, title, userId } = createMemoDTO;

    const newMemo = this.prisma.memo.create({
      data: {
        content,
        coverImage,
        title,
        userId,
      },
    });

    await this.prisma.$transaction([newMemo]);
  }

  async createMemo(createMemoDTO: CreateMemoDTO): Promise<MutationResponse> {
    try {
      await this.saveMemo(createMemoDTO);
      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: "create new memo failed",
      };
    }
  }

  async getMemo(
    memoWhereUniqueInput: Prisma.MemoWhereUniqueInput,
  ): Promise<Memo | undefined> {
    return await this.prisma.memo.findUnique({
      where: memoWhereUniqueInput,
    });
  }

  async getMemos(
    userId: string,
    option: GetMemosDTO,
  ): Promise<Memo[] | undefined> {
    const { id, offset, limit } = option;

    return await this.prisma.memo.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      // skip: offset,
      take: limit,
      ...(id && {
        skip: 1,
        cursor: {
          id,
        },
      }),
      ...(!id && {
        skip: offset,
      }),
    });
  }

  async updateMemo(
    memoId: string,
    userId: string,
    updateMemoDTO: UpdateMemoDTO,
  ): Promise<MutationResponse> {
    const { content, coverImage, title } = updateMemoDTO;

    const existMemo = await this.prisma.memo.findFirst({
      where: { id: memoId, userId },
    });

    if (!existMemo) {
      return {
        ok: false,
        error: "memo not exist or not your memo",
      };
    }

    const updatedMemo = this.prisma.memo.update({
      where: { id: existMemo.id },
      data: {
        content,
        coverImage,
        title,
      },
    });

    try {
      await this.prisma.$transaction([updatedMemo]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "faild update memo",
      };
    }
  }

  async deletMemo(id: string): Promise<MutationResponse> {
    const memo = await this.prisma.memo.findUnique({
      where: { id },
    });

    if (!memo)
      return {
        ok: false,
        error: "memo not exist",
      };

    await this.prisma.memo.delete({
      where: {
        id,
      },
    });

    const memoExist = await this.checkMemoExist(id);

    if (memoExist) {
      return {
        ok: false,
        error: "failed delete memo",
      };
    } else {
      return { ok: true };
    }
  }
}
