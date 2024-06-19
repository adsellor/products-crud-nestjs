import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import {Category} from "./categories";

export const Product = sqliteTable(
	'product',
	{
		id: integer('id').primaryKey(),
		title: text('title').notNull(),
		description: text('description').notNull(),
		sku: text('sku').notNull(),
		price: integer('price').notNull(),
		categoryId: integer('categoryId')
			.notNull()
			.references(() => Category.id)
	},
	(product) => ({
		skuIdx: uniqueIndex('skuIdx').on(product.sku)
	}))

export type SelectProduct = typeof Product.$inferSelect;
export type InsertProduct = typeof Product.$inferInsert;
