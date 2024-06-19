import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import * as productsSchema from '../../../db/schema/products';
import { GetProductQuery } from './getProduct.query';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @Inject('DB_SQLITE')
    private productRepository: BetterSQLite3Database<typeof productsSchema>,
  ) {}

  async execute({ productId }: GetProductQuery) {
    try {
      const product = await this.productRepository.query.Product.findFirst({
        where: (product, { eq }) => eq(product.id, productId),
        with: {
          category: true,
        },
      });
      if (!product) {
        return null;
      }

      return product;
    } catch (e) {
      Logger.error(`Error occured when getting item ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
