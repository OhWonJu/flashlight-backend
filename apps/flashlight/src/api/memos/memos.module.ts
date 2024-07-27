import { Module } from "@nestjs/common";

import { MemoModule } from "@lib/crud/memo/memo.module";
import { UploadsModule } from "@lib/uploads/uploads.module";

import { MemosController } from "./memos.controller";
import { MemosService } from "./memos.service";

@Module({
  imports: [MemoModule, UploadsModule],
  controllers: [MemosController],
  providers: [MemosService],
  exports: [MemosService],
})
export class MemosModule {}
