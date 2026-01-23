import { drizzle } from "drizzle-orm/node-postgres";
import express from "express";
import * as schema from "./db/schema.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = drizzle(process.env.DATABASE_URL!, { schema });

app.post("/events", async (req, res) => {
  const {
    name,
    ticket_price_in_cents: ticketPriceInCents,
    latitude,
    longitude,
    date,
    owner_id: ownerId
  } = req.body;

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      ownerId
    )
  ) {
    return res.status(400).json({ error: "Invalid owner_id" });
  }

  if (ticketPriceInCents < 0) {
    return res
      .status(400)
      .json({ error: "The ticket_price_in_cents must be non-negative" });
  }

  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({ error: "Invalid latitude" });
  }

  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: "Invalid longitude" });
  }

  const now = new Date();
  const dateFormatted = new Date(date);

  if (dateFormatted < now) {
    return res.status(400).json({ error: "The date must be in the future" });
  }

  const event = await db.insert(schema.eventsTable).values({
    name,
    ticketPriceInCents,
    date: dateFormatted,
    latitude,
    longitude,
    ownerId
  });

  return res.status(201).json(event);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
