import { Module } from "@nestjs/common";

import { DatabaseModule } from "@lib/database/database.module";

import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}