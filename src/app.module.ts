import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceModule } from './database/app.datasource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    PaymentModule,
    RabbitmqModule,
    AppDataSourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
