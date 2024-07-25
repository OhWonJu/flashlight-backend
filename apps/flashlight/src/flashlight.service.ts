import { Injectable } from "@nestjs/common";

@Injectable()
export class FlashlightService {
  getHello(): string {
    return `Server mode ${process.env.CURRENT_MODE}`;
  }
}
