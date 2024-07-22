import { NestFactory } from "@nestjs/core";
import { FlashlightModule } from "./flashlight.module";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === "development" ? ".env" : ".env.stage",
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(FlashlightModule);
  await app.listen(4000);
}
bootstrap();
