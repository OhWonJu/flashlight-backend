import { Module } from "@nestjs/common";

import { DatabaseModule } from "@lib/database/database.module";

import { MemoService } from "./memo.service";

@Module({
  imports: [DatabaseModule],
  providers: [MemoService],
  exports: [MemoService],
})
export class MemoModule {}
