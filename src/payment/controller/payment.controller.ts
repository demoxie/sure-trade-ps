import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentService } from '../service/payment.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Patterns } from '../../enums';

@Controller()
@ApiTags('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern(Patterns.PAYMENT_QUEUE)
  async handlePaymentQueue(
    @Payload() data: PaymentDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('Message received: ', data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      channel.ack(originalMsg);
      await this.paymentService.savePayment(data);
    } catch (e) {
      console.log(e);
      channel.nack(originalMsg);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Make payment' })
  @ApiBody({ type: PaymentDto })
  @ApiResponse({ status: 200, description: 'Payment processed successfully' })
  async postHello(@Body() request: PaymentDto): Promise<void> {
    return await this.paymentService.savePayment(request);
  }
}
