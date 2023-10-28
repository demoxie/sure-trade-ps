import { PaymentStatus } from '../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageDto } from '../../dto/messageDto';

export class PaymentDto {
  @ApiPropertyOptional()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  payerId: number;
  @ApiProperty()
  receiverId: number;
  @ApiPropertyOptional()
  status: PaymentStatus;
  @ApiProperty()
  transactionReference: string;
  @ApiProperty()
  productName: string;
  @ApiProperty()
  productDescription: string;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  reference: string;
  @ApiProperty()
  paymentMethod: string;
  @ApiProperty()
  paymentChannel: string;
  @ApiProperty()
  paymentProvider: string;
  @ApiProperty()
  message: MessageDto;
}
