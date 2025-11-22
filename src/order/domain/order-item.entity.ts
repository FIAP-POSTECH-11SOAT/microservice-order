import { UniqueEntityID } from 'src/shared/entities/unique-entity-id';
import { Price } from '../../shared/entities/price';

type OrderItemProps = {
  orderId: UniqueEntityID;
  itemId: UniqueEntityID;
  price: Price;
  quantity: number;
};

export type CreateOrderItemProps = {
  orderId: string;
  itemId: string;
  price: number;
  quantity: number;
};

export class OrderItem {
  private props: OrderItemProps;

  constructor(props: OrderItemProps) {
    this.props = props;
  }

  get orderId(): string {
    return this.props.orderId.toString();
  }

  get itemId(): string | undefined {
    return this.props.itemId.toString();
  }

  get price(): number {
    return this.props.price.value();
  }

  get quantity(): number {
    return this.props.quantity;
  }

  static create(props: CreateOrderItemProps): OrderItem {
    const orderItem = new OrderItem({
      itemId: new UniqueEntityID(props.itemId),
      orderId: new UniqueEntityID(props.orderId),
      price: Price.create(props.price),
      quantity: props.quantity,
    });
    return orderItem;
  }
}
