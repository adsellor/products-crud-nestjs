import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';

import * as productsSchema from '../db/schema/products';
import * as categoriesSchema from '../db/schema/categories';
import * as relationsSchema from '../db/schema/relations';

const schema = {
  ...productsSchema,
  ...categoriesSchema,
  ...relationsSchema,
};

@Module({
  imports: [
    ProductsModule,
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_SQLITE',
      sqlite3: {
        filename: 'db.sql',
      },
      config: {
        schema: { ...schema },
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
