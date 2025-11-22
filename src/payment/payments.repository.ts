import { Payment } from './payment.entity';

export class PaymentsRepository {
  findByOrderId(orderId: string): Promise<Payment | null> {
    return Promise.resolve(null);
  }
}
