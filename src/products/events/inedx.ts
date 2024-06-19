import { ProductCreatedHandler } from './productCreated.handler';
import { ProductDeletedHandler } from './productDeleted.handler';
import { ProductUpdatedHandler } from './productUpdated.handler';

export const EventHandlers = [
  ProductDeletedHandler,
  ProductUpdatedHandler,
  ProductCreatedHandler,
];
