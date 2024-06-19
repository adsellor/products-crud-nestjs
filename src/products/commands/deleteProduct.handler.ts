import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import * as productsSchema from '../../../db/schema/products';
import { eq } from 'drizzle-orm';
import { DeleteProductCommand } from './deleteProduct.command';
import { ProductDeletedEvent } from '../events/productDeleted.event';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @Inject('DB_SQLITE')
    private productRepository: BetterSQLite3Database<typeof productsSchema>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ id }: DeleteProductCommand) {
    try {
      const deletedProduct = await this.productRepository
        .delete(productsSchema.Product)
        .where(eq(productsSchema.Product.id, id))
        .returning({ deletedId: productsSchema.Product.id });

      this.eventBus.publish(new ProductDeletedEvent(id));

      return deletedProduct;
    } catch (e) {
      Logger.error(`Failed to delete product with id ${id} ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
