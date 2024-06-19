import { CreateProductDTO } from '../dto/product.dto';

export class CreateProductCommand {
  constructor(public readonly command: CreateProductDTO) {}
}
