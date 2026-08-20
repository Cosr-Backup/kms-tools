CREATE TABLE `monitor_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`server_id` integer NOT NULL,
	`status` integer NOT NULL,
	`delay` real NOT NULL,
	`checked_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "monitor_records_delay_check" CHECK("monitor_records"."delay" >= -1)
);
--> statement-breakpoint
CREATE INDEX `monitor_records_server_checked_at_idx` ON `monitor_records` (`server_id`,`checked_at`);--> statement-breakpoint
CREATE TABLE `servers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`host` text NOT NULL,
	`port` integer DEFAULT 1688 NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	CONSTRAINT "servers_port_check" CHECK("servers"."port" between 1 and 65535)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `servers_host_port_unique` ON `servers` (`host`,`port`);