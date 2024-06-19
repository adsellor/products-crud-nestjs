import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from './productCreated.event';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  async handle({ product }: ProductCreatedEvent) {
    Logger.log(`Product with id ${product.id} was created`);
  }
}
