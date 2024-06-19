import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import * as productsSchema from '../db/schema/products'
import * as categoriesSchema from '../db/schema/categories'
import * as relationsSchema from '../db/schema/relations'

@Module({
  imports: [
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_ENV',
      sqlite3: {
        filename: 'db.sql'
      },
      config: {
        schema: { ...productsSchema, ...categoriesSchema, ...relationsSchema }
      }
    })
  ],
  controllers: [AppController],
})

export class AppModule { }
