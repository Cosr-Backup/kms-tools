import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

type D1Client = Parameters<typeof drizzle>[0]

interface CloudflareContext {
  cloudflare?: {
    env?: {
      DB?: D1Client
    }
  }
}

export const getD1Database = (context: unknown) => {
  const client = (context as CloudflareContext).cloudflare?.env?.DB

  return client ? drizzle(client, { schema }) : undefined
}

export type KmsDatabase = NonNullable<ReturnType<typeof getD1Database>>
