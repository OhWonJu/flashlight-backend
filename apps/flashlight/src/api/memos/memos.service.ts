import { Injectable } from "@nestjs/common";
import { Memo } from "@prisma/client";

import { UploadsService } from "@lib/uploads/uploads.service";
import { Memos, MemoService } from "@lib/crud/memo/memo.service";
import { CreateMemoDTO, GetMemosDTO, UpdateMemoDTO } from "@lib/crud/memo/dto";

import { MutationResponse } from "decorators/types/mutationResopnse";

@Injectable()
export class MemosService {
  constructor(
    private memoService: MemoService,
    private uploadsService: UploadsService,
  ) {}

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
    const result = await this.memoService.getMemos(userId, option);
    return result;
  }

  async updateMemo({
    memoId,
    userId,
    file,
    updateMemoDTO,
  }: {
    memoId: string;
    userId: string;
    file: any;
    updateMemoDTO: UpdateMemoDTO;
  }): Promise<MutationResponse> {
    const folderName = "user/" + userId + "/" + memoId;

    if (file) {
      const s3Url = await this.uploadsService.uploadToS3(file, folderName);

      updateMemoDTO.coverImage = s3Url;
    }

    return await this.memoService.updateMemo(memoId, userId, updateMemoDTO);
  }

  async deleteMemo(memoId: string, userId: string): Promise<MutationResponse> {
    return await this.memoService.deletMemo(memoId, userId);
  }
}
