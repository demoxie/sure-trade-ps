import { PaymentEntity } from './payment.entity';

describe('Payment', () => {
  it('should be defined', () => {
    expect(new PaymentEntity()).toBeDefined();
  });
});
