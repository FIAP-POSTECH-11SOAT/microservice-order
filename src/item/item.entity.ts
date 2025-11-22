import { Injectable } from '@nestjs/common';
import { Price } from '../shared/entities/price';
import { UniqueEntityID } from '../shared/entities/unique-entity-id';
import { ValidString } from '../shared/entities/valid-string';

@Injectable()
export class Item {
  id: UniqueEntityID;
  name: ValidString;
  description: ValidString;
  price: Price;
  image: ValidString;
  categoryId: UniqueEntityID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  private constructor(props: Partial<Item>) {
    Object.assign(this, props);
  }
}
