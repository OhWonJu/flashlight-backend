import { Injectable } from "@nestjs/common";
import { Memo } from "@prisma/client";

import { Memos, MemoService } from "@lib/crud/memo/memo.service";
import { CreateMemoDTO, GetMemosDTO, UpdateMemoDTO } from "@lib/crud/memo/dto";

import { MutationResponse } from "decorators/types/mutationResopnse";

@Injectable()
export class MemosService {
  constructor(private memoService: MemoService) {}

  async createMemo(createMemoDTO: CreateMemoDTO): Promise<MutationResponse> {
    return await this.memoService.createMemo(createMemoDTO);
  }

  async getMemo(memoId: string): Promise<Memo | undefined> {
    return await this.memoService.getMemo({ id: memoId });
  }

  async getMemos(
    userId: string,
    option: GetMemosDTO,
  ): Promise<Memos[] | undefined> {
    return await this.memoService.getMemos(userId, option);
  }

  async updateMemo({
    memoId,
    userId,
    updateMemoDTO,
  }: {
    memoId: string;
    userId: string;
    updateMemoDTO: UpdateMemoDTO;
  }): Promise<MutationResponse> {
    return await this.memoService.updateMemo(memoId, userId, updateMemoDTO);
  }

  async deleteMemo(memoId: string, userId: string): Promise<MutationResponse> {
    return await this.memoService.deletMemo(memoId, userId);
  }
}
