import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductDeletedEvent } from './productDeleted.event';

@EventsHandler(ProductDeletedEvent)
export class ProductDeletedHandler
  implements IEventHandler<ProductDeletedEvent>
{
  async handle({ id }: ProductDeletedEvent) {
    Logger.log(`The product with id ${id} was deleted`);
  }
}
