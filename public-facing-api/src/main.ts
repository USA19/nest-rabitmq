import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { urlencoded, json } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api")
  app.useStaticAssets(join(__dirname, '../../', 'static'));
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, transform: true, transformOptions: { enableImplicitConversion: true } }));
  app.use(json({ limit: '100000000kb' }));
  app.use(urlencoded({ extended: true, limit: '100000000kb' }));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('App listening on port ', port)
}

bootstrap();
