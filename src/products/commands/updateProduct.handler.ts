import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import * as productsSchema from '../../../db/schema/products';
import { UpdateProductCommand } from './updateProduct.command';
import { ProductUpdatedEvent } from '../events/productUpdated.event';
import { eq } from 'drizzle-orm';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject('DB_SQLITE')
    private productRepository: BetterSQLite3Database<typeof productsSchema>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ product, id }: UpdateProductCommand) {
    try {
      const updatedProduct = await this.productRepository
        .update(productsSchema.Product)
        .set(product)
        .where(eq(productsSchema.Product.id, id))
        .returning();

      this.eventBus.publish(new ProductUpdatedEvent(id, updatedProduct[0]));

      return updatedProduct[0];
    } catch (e) {
      Logger.error(`Error occured when creating the items ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
