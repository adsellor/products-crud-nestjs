import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async find(
    @Query()
    query: {
      page?: number;
      pageLimit?: number;
    },
  ) {
    return this.productsService.getAll(query.page, query.pageLimit);
  }

  @Get(':id')
  async findOne(
    @Param()
    params: {
      id: number;
    },
  ) {
    return this.productsService.get(params.id);
  }

  @Post()
  async create(
    @Body()
    body: CreateProductDTO,
  ): Promise<void> {
    return this.productsService.create(body);
  }

  @Patch(':id')
  async update(
    @Body()
    body: UpdateProductDTO,
    @Param()
    params: { id: number },
  ) {
    return this.productsService.update(params.id, body);
  }

  @Delete(':id')
  async delete(
    @Param()
    params: {
      id: number;
    },
  ) {
    return this.productsService.delete(params.id);
  }
}
