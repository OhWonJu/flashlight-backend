import { Module } from "@nestjs/common";
import { MemosController } from "./memos.controller";
import { MemosService } from "./memos.service";
import { MemoModule } from "@lib/crud/memo/memo.module";

@Module({
  imports: [MemoModule],
  controllers: [MemosController],
  providers: [MemosService],
  exports: [MemosService],
})
export class MemosModule {}
