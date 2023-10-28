import { forwardRef, Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller.js';
import { PaymentService } from './service/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    forwardRef(() => RabbitmqModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
