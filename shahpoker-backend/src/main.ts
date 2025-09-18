// FILE: shahpoker-backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // START: پیکربندی کامل CORS
  app.enableCors({
    origin: 'http://localhost:3001', // فقط به فرانت‌اند ما اجازه دسترسی می‌دهد
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // END: پیکربندی کامل CORS

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
