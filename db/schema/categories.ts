import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

export const Category = sqliteTable(
	'category',
	{
		id: integer('id').primaryKey(),
		title: text('title').notNull(),
		description: text('description').notNull(),
	},
	(category) => ({
		titleIdx: uniqueIndex('titleIdx').on(category.title),
	}))


export type SelectCategory = typeof Category.$inferSelect;
export type InsertCategory = typeof Category.$inferInsert;
