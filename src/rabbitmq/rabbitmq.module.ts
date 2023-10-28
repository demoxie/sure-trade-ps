import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../payment/service/payment.service';
import { PaymentModule } from '../payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payment/entity/payment.entity';

@Module({
  imports: [
    forwardRef(() => PaymentModule),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_EMAIL_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.get(
                'RABBITMQ_PASSWORD',
              )}:${configService.get('RABBITMQ_USER')}@${configService.get(
                'RABBITMQ_HOST',
              )}:${configService.get('RABBITMQ_PORT')}`,
            ],
            queue: configService.get('EMAIL_QUEUE'),
            persistent: true,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'RABBITMQ_PAYMENT_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.get(
                'RABBITMQ_PASSWORD',
              )}:${configService.get('RABBITMQ_USER')}@${configService.get(
                'RABBITMQ_HOST',
              )}:${configService.get('RABBITMQ_PORT')}`,
            ],
            queue: configService.get('PAYMENT_QUEUE'),
            persistent: true,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [],
  exports: [ClientsModule],
  providers: [PaymentService],
})
export class RabbitmqModule {}
