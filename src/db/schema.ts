import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { integer } from "node_modules/drizzle-orm/pg-core/index.cjs";

export const eventsTable = pgTable("events", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  ticketPriceInCents: integer("ticket_price_in_cents").notNull()
});

export const usersTable = pgTable("users", {
  id: uuid()
});

// paramos no timezone
