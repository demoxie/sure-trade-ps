import { Inject, Injectable } from '@nestjs/common';
import { PaymentDto } from '../dto/payment.dto.js';
import { Payment } from '../entity/payment.entity.js';
import { PaymentMethod, PaymentStatus } from '../enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Patterns } from '../../enums';
import { timeout } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject('RABBITMQ_EMAIL_SERVICE')
    private client: ClientProxy,
  ) {}
  public async savePayment(paymentDto: PaymentDto) {
    console.log('payment', paymentDto);
    const payment = this.mapDtoToEntity(paymentDto);
    const email = paymentDto.message;
    this.client
      .emit(Patterns.EMAIL_QUEUE, email)
      .pipe(timeout(1000))
      .subscribe((res) => {
        console.log(res);
      });
    await this.paymentRepository.save(payment);
  }

  private mapDtoToEntity(payment: PaymentDto): Payment {
    const newPayment = new Payment();
    newPayment.id = payment.id;
    newPayment.productId = payment.productId;
    newPayment.amount = payment.amount;
    newPayment.currency = payment.currency;
    newPayment.description = payment.description;
    newPayment.productDescription = payment.productDescription;
    newPayment.paymentChannel = payment.paymentChannel;
    const pm = this.stringToPaymentMethod(payment.paymentMethod);
    console.log('PAYMENT {}', pm);
    newPayment.paymentMethod = pm;
    newPayment.payerId = payment.payerId;
    newPayment.receiverId = payment.receiverId;
    newPayment.productName = payment.productName;
    newPayment.reference = payment.reference;
    newPayment.transactionReference = payment.transactionReference;
    newPayment.paymentProvider = payment.paymentProvider;
    newPayment.status = PaymentStatus.SUCCESS;
    newPayment.createdAt = new Date();
    newPayment.updatedAt = new Date();
    return newPayment;
  }

  private stringToPaymentStatus = (status: string): PaymentStatus => {
    switch (status) {
      case 'REFUNDED':
        return PaymentStatus.REFUNDED;
      case 'SUCCESSFUL':
        return PaymentStatus.SUCCESS;
      case 'FAILED':
        return PaymentStatus.FAILED;
      case 'CANCELLED':
        return PaymentStatus.CANCELLED;
      default:
        return PaymentStatus.PENDING;
    }
  };

  private stringToPaymentMethod = (method: string): PaymentMethod => {
    switch (method) {
      case 'CARD':
        return PaymentMethod.CARD;
      case 'BANK_TRANSFER':
        return PaymentMethod.BANK_TRANSFER;
      case 'MOBILE_MONEY':
        return PaymentMethod.MOBILE_MONEY;
      default:
        return PaymentMethod.CARD;
    }
  };
}
