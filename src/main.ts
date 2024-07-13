import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './docs/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  const configService = app.get(ConfigService);
  //Set Swagger To test Api with Ui
  setupSwagger(app);
  //whitelist: Automatically remove properties from the request payload that are not defined in the DTO. This ensures that only the validated properties are passed through.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(configService.getOrThrow<string>('SERVER_PORT'));
}
bootstrap();
