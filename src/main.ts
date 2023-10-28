import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './middleware/logger/logger.middleware';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  const config = new DocumentBuilder()
    .setTitle('Payment Service API')
    .setDescription('The Payment Service API description')
    .setVersion('1.0')
    .addTag('payment-service-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get('RABBITMQ_PASSWORD')}:${configService.get(
          'RABBITMQ_USER',
        )}@${configService.get('RABBITMQ_HOST')}:${configService.get(
          'RABBITMQ_PORT',
        )}`,
      ],
      noAck: false,
      queue: configService.get('PAYMENT_QUEUE'),
      queueOptions: {
        durable: true,
      },
    },
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get('RABBITMQ_PASSWORD')}:${configService.get(
          'RABBITMQ_USER',
        )}@${configService.get('RABBITMQ_HOST')}:${configService.get(
          'RABBITMQ_PORT',
        )}`,
      ],
      noAck: false,
      queue: configService.get('EMAIL_QUEUE'),
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
  const PORT = configService.get('PORT');
  app.use(logger);
  await app.listen(PORT);
}
const port = process.env.PORT || 3000;
bootstrap()
  .then(() => console.log(`Application is listening on port ${port}`))
  .catch((err) => console.error('Application failed to start', err));
