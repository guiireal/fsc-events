import express from "express";
import { createEvent } from "./application/create-event.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/events", async (req, res) => {
  const {
    name,
    ticket_price_in_cents: ticketPriceInCents,
    latitude,
    longitude,
    date,
    owner_id: ownerId
  } = req.body;

  try {
    const event = await createEvent({
      name,
      ticketPriceInCents,
      latitude,
      longitude,
      date: new Date(date),
      ownerId
    });
    return res.status(201).json(event);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "Unknown error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
