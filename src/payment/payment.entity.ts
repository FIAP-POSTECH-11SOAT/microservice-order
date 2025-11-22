import { UniqueEntityID } from 'src/shared/entities/unique-entity-id';

export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export class Payment {
  id: UniqueEntityID;
  orderId: UniqueEntityID;
  status: PaymentStatus;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  externalId?: string;

  constructor(props: Partial<Payment>) {
    Object.assign(this, props);
  }
}
