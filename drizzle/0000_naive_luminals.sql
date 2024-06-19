CREATE TABLE `category` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`sku` text NOT NULL,
	`price` integer NOT NULL,
	`categoryId` integer NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `titleIdx` ON `category` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `skuIdx` ON `product` (`sku`);