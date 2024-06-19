import type { Config } from 'drizzle-kit';

export default {
	schema: './db/schema/*',
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: 'file:./db.sql',
	},
	driver: 'turso'
} satisfies Config;
