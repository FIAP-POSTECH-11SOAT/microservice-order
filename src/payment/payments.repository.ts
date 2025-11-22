import { Payment } from './payment.entity';

export abstract class PaymentsRepository {
  abstract findByOrderId(orderId: string): Promise<Payment | null>;
}
