import { Item } from './item.entity';

export abstract class ItemsRepository {
  abstract findById(id: string): Promise<Item | null>;
}
