import { NestFactory } from '@nestjs/core';
import { FlashlightModule } from './flashlight.module';

async function bootstrap() {
  const app = await NestFactory.create(FlashlightModule);
  await app.listen(4000);
}
bootstrap();
