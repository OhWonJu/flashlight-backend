import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { MemosService } from "./memos.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateMemoDTO, UpdateMemoDTO } from "@lib/crud/memo/dto";
import { MutationResponse } from "decorators/types/mutationResopnse";
import { Memo } from "@prisma/client";

@UseGuards(AuthGuard)
@Controller("memos")
export class MemosController {
  constructor(private memosService: MemosService) {}

  @Post("/create")
  async createMemo(
    @Body() createMemoDTO: CreateMemoDTO,
  ): Promise<MutationResponse> {
    return await this.memosService.createMemo(createMemoDTO);
  }

  @Get("/:memoId")
  async getMemo(@Param("memoId") memoId: string): Promise<Memo | undefined> {
    return await this.memosService.getMemo(memoId);
  }

  @Patch("/:memoId")
  async updateMemo(
    @Request() req,
    @Param("memoId") memoId: string,
    @Body() updateMemoDTO: UpdateMemoDTO,
  ): Promise<MutationResponse> {
    return await this.memosService.updateMemo({
      memoId,
      userId: req.user.sub,
      updateMemoDTO,
    });
  }

  @Delete("/delete/:memoId")
  async deleteMemo(
    @Request() req,
    @Param("memoId") memoId: string,
  ): Promise<MutationResponse> {
    return await this.memosService.deleteMemo(memoId, req.user.sub);
  }
}
