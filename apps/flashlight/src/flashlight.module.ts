import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { FlashlightController } from "./flashlight.controller";
import { FlashlightService } from "./flashlight.service";

import { UsersModule } from "./api/users/users.module";
import { AuthModule } from "./api/auth/auth.module";
import { MemosModule } from "./api/memos/memos.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    MemosModule,
  ],
  controllers: [FlashlightController],
  providers: [FlashlightService],
})
export class FlashlightModule {}
