import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FlashlightController } from "./flashlight.controller";
import { FlashlightService } from "./flashlight.service";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [FlashlightController],
  providers: [FlashlightService],
})
export class FlashlightModule {}
