import { relations } from "drizzle-orm";

import { Category } from "./categories";
import { Product } from "./products";

export const productRelations = relations(Product, ({ one }) => ({
	category: one(Category, {
		references: [Category.id],
		fields: [Product.categoryId]
	})
}))

export const categoriRelations = relations(Category, ({ many }) => ({
	products: many(Product)
}))
