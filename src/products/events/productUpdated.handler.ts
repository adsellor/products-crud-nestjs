import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductUpdatedEvent } from './productUpdated.event';

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler
  implements IEventHandler<ProductUpdatedEvent>
{
  async handle({ id }: ProductUpdatedEvent) {
    Logger.log(`The product with id ${id} was updated`);
  }
}
