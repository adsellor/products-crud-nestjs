import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events/inedx';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { QueryHandlers } from './query';

@Module({
  imports: [CqrsModule],
  controllers: [ProductsController],
  providers: [
    Logger,
    ProductsService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ProductsModule {}
