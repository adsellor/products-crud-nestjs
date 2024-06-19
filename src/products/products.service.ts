import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/createProduct.command';
import { DeleteProductCommand } from './commands/deleteProduct.command';
import { GetProductQuery } from './query/getProduct.query';
import { GetProductsQuery } from './query/getProducts.query';
import { UpdateProductCommand } from './commands/updateProduct.command';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async get(id: number) {
    return await this.queryBus.execute(new GetProductQuery(id));
  }

  async getAll(page?: number, pageLimit?: number) {
    return await this.queryBus.execute(new GetProductsQuery(page, pageLimit));
  }

  async create(products: CreateProductDTO) {
    return await this.commandBus.execute(new CreateProductCommand(products));
  }

  async update(id: number, product: UpdateProductDTO) {
    return await this.commandBus.execute(new UpdateProductCommand(id, product));
  }

  async delete(id: number) {
    return await this.commandBus.execute(new DeleteProductCommand(id));
  }
}
