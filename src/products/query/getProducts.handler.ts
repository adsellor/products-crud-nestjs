import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import * as productsSchema from '../../../db/schema/products';
import { GetProductsQuery } from './getProducts.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @Inject('DB_SQLITE')
    private productRepository: BetterSQLite3Database<typeof productsSchema>,
  ) {}

  async execute({page = 0, pageSize = 1}: GetProductsQuery) {
    try {
      const products = await this.productRepository.query.Product.findMany({
        limit: pageSize,
        offset:  (page - 1) * pageSize,
        with: {
          category: true,
        },
      });

      return products;
    } catch (e) {
      Logger.error(`Error occured when getting all products ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
