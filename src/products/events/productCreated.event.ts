import { InsertProduct } from 'db/schema/products';

export class ProductCreatedEvent {
  constructor(public readonly product: InsertProduct) {}
}
