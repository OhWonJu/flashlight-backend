import { Injectable } from "@nestjs/common";

@Injectable()
export class FlashlightService {
  getHello(): string {
    return "Hello World!";
  }
}
