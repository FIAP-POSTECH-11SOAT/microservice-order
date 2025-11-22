import { Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { ItemsRepository } from './items.repository';
import { UniqueEntityID } from '../shared/entities/unique-entity-id';
import { ValidString } from '../shared/entities/valid-string';
import { Price } from '../shared/entities/price';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

type ItemResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

@Injectable()
export class ItemsGateway implements ItemsRepository {
  constructor(private readonly httpService: HttpService) {}

  async findById(id: string): Promise<Item | null> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ItemResponse>(`${process.env.ITEMS_URL}/items/${id}`)
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response?.data;
          }),
        ),
    );

    return new Item({
      id: new UniqueEntityID(data.id),
      name: ValidString.create(data.name),
      description: ValidString.create(data.description),
      price: Price.create(data.price),
      image: ValidString.create(data.image),
      categoryId: new UniqueEntityID(data.categoryId),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      deletedAt: data.deletedAt ? new Date(data.deletedAt) : null,
    });
  }
}
