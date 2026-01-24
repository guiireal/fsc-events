import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema.js";

const db = drizzle(process.env.DATABASE_URL!, { schema });

type EventInput = {
  name: string;
  ticketPriceInCents: number;
  date: Date;
  latitude: number;
  longitude: number;
  ownerId: string;
};

export async function createEventOnDatabase({
  name,
  ticketPriceInCents,
  latitude,
  longitude,
  date: dateFormatted,
  ownerId
}: EventInput) {
  const event = await db
    .insert(schema.eventsTable)
    .values({
      name,
      ticketPriceInCents,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      date: dateFormatted,
      ownerId
    })
    .returning();

  return event[0];
}
