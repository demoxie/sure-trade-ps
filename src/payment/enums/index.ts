export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK TRANSFER',
  USSD = 'USSD',
  QR = 'QR',
  WALLET = 'WALLET',
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  POINT_OF_SALE = 'POINT OF SALE',
  MOBILE_MONEY = 'MOBILE MONEY',
  CRYPTO = 'CRYPTO',
}

export enum RabbitmqQueue {
  PAYMENT = 'payment',
  REFUND = 'refund',
  CANCEL = 'cancel',
  SUCCESS = 'success',
  FAILED = 'failed',
}
