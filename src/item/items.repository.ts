import { Item } from './item.entity';

export class ItemsRepository {
  findById(id: string): Promise<Item | null> {
    return Promise.resolve(null);
  }
}
