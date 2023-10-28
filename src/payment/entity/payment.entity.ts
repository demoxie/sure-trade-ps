import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentMethod, PaymentStatus } from '../enums';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  amount: number;
  @Column()
  currency: string;
  @Column()
  payerId: number;
  @Column()
  receiverId: number;
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
  @Column()
  productName: string;
  @Column()
  productDescription: string;
  @Column()
  productId: number;
  @Column()
  reference: string;
  @Column()
  transactionReference: string;
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CARD,
  })
  paymentMethod: PaymentMethod;
  @Column()
  paymentChannel: string;
  @Column()
  paymentProvider: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
