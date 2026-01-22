import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { integer } from "node_modules/drizzle-orm/pg-core/index.cjs";

export const eventsTable = pgTable("events", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  ticketPrice: integer("ticket_price").notNull()
});

export const usersTable = pgTable("users", {
  id: uuid()
});
