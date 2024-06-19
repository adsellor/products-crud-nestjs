import { UpdateProductDTO } from '../dto/product.dto';

export class UpdateProductCommand {
  constructor(
    public readonly id: number,
    public readonly product: UpdateProductDTO,
  ) {}
}
