import { Injectable } from '@nestjs/common';
import { Payment, PaymentStatus } from './payment.entity';
import { PaymentsRepository } from './payments.repository';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { UniqueEntityID } from '../shared/entities/unique-entity-id';

type PaymentResponse = {
  id: string;
  orderId: string;
  status: PaymentStatus;
  qrCode: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  externalId?: string;
};

@Injectable()
export class PaymentsGateway implements PaymentsRepository {
  constructor(private readonly httpService: HttpService) {}

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<PaymentResponse>(
          `${process.env.PAYMENTS_URL}/payments/orders/${orderId}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response?.data;
          }),
        ),
    );

    if (!data) {
      return null;
    }

    return new Payment({
      id: new UniqueEntityID(data.id),
      orderId: new UniqueEntityID(data.orderId),
      status: data.status,
      qrCode: data.qrCode,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      amount: data.amount,
      externalId: data.externalId,
    });
  }
}
