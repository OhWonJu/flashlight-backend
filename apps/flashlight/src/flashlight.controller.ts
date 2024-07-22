import { Controller, Get } from "@nestjs/common";
import { FlashlightService } from "./flashlight.service";

@Controller()
export class FlashlightController {
  constructor(private readonly flashlightService: FlashlightService) {}

  @Get()
  getHello(): string {
    return this.flashlightService.getHello();
  }
}
