/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(
  app: INestApplication,
): void {

  const config = new DocumentBuilder()
    .setTitle('Tasks Collection Rest API')
    .setDescription('Tasks Collection Swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('taskdocs', app, document);
}