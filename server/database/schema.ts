import { relations, sql } from 'drizzle-orm'
import {
  check,
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'

const currentTimestamp = sql`(unixepoch() * 1000)`

export const servers = sqliteTable(
  'servers',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    host: text('host').notNull(),
    port: integer('port').notNull().default(1688),
    enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .notNull()
      .default(currentTimestamp),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .notNull()
      .default(currentTimestamp)
  },
  table => [
    uniqueIndex('servers_host_port_unique').on(table.host, table.port),
    check('servers_port_check', sql`${table.port} between 1 and 65535`)
  ]
)

export const monitorRecords = sqliteTable(
  'monitor_records',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    serverId: integer('server_id')
      .notNull()
      .references(() => servers.id, { onDelete: 'cascade' }),
    status: integer('status', { mode: 'boolean' }).notNull(),
    delay: real('delay').notNull(),
    checkedAt: integer('checked_at', { mode: 'timestamp_ms' })
      .notNull()
      .default(currentTimestamp)
  },
  table => [
    index('monitor_records_server_checked_at_idx').on(
      table.serverId,
      table.checkedAt
    ),
    check('monitor_records_delay_check', sql`${table.delay} >= -1`)
  ]
)

export const serversRelations = relations(servers, ({ many }) => ({
  records: many(monitorRecords)
}))

export const monitorRecordsRelations = relations(monitorRecords, ({ one }) => ({
  server: one(servers, {
    fields: [monitorRecords.serverId],
    references: [servers.id]
  })
}))

export type Server = typeof servers.$inferSelect
export type NewServer = typeof servers.$inferInsert
export type MonitorRecord = typeof monitorRecords.$inferSelect
export type NewMonitorRecord = typeof monitorRecords.$inferInsert
