import { UpdateProductDTO } from '../dto/product.dto';

export class ProductUpdatedEvent {
  constructor(
    public readonly id: number,
    public readonly product: UpdateProductDTO,
  ) {}
}
