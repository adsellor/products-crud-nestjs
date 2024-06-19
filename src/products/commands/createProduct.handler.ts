import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { nanoid } from 'nanoid';

import * as productsSchema from '../../../db/schema/products';
import { ProductCreatedEvent } from '../events/productCreated.event';
import { CreateProductCommand } from './createProduct.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('DB_SQLITE')
    private productRepository: BetterSQLite3Database<typeof productsSchema>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ command }: CreateProductCommand) {
    const { products } = command;
    try {
      const createdProducts = await this.productRepository
        .insert(productsSchema.Product)
        .values(
          products.map((product) => ({
            ...product,
            sku: nanoid(8),
          })),
        )
        .returning();

      createdProducts.forEach((product) => {
        this.eventBus.publish(new ProductCreatedEvent(product));
      });

      return createdProducts;
    } catch (e) {
      Logger.error(`Error occured when creating the items ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
