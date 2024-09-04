import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  API_NAME,
  API_DESCRIPTION,
  API_VERSION,
  API_PREFIX,
} from './constants/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: API_VERSION,
    })
    .setGlobalPrefix(API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle(API_NAME)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${API_PREFIX}/:version/docs`, app, document);

  await app.listen(3000);
}
bootstrap();
