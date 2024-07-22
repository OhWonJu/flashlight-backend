import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Memo } from "@prisma/client";

import { MutationResponse } from "decorators/types/mutationResopnse";

import { CreateMemoDTO, UpdateMemoDTO } from "@lib/crud/memo/dto";
import { Memos } from "@lib/crud/memo/memo.service";

import { MemosService } from "./memos.service";
import { AuthGuard } from "../auth/auth.guard";

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

  @Get("/memo/:memoId")
  async getMemo(@Param("memoId") memoId: string): Promise<Memo | undefined> {
    return await this.memosService.getMemo(memoId);
  }

  @Get("/list")
  async getAllMemoList(
    @Request() req,
    @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query("limit", new DefaultValuePipe(2), ParseIntPipe) limit: number,
    @Query("cursor", new DefaultValuePipe("")) cursor?: string,
  ): Promise<Memos[] | undefined> {
    return await this.memosService.getMemos(req.user.sub, {
      id: cursor,
      offset,
      limit,
    });
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
