import { createEventOnDatabase } from "../resources/create-event.js";

type EventInput = {
  name: string;
  ticketPriceInCents: number;
  date: Date;
  latitude: number;
  longitude: number;
  ownerId: string;
};

export async function createEvent({
  name,
  ownerId,
  ticketPriceInCents,
  latitude,
  longitude,
  date
}: EventInput) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      ownerId
    )
  ) {
    throw new Error("Invalid owner_id");
  }

  if (ticketPriceInCents < 0) {
    throw new Error("The ticket_price_in_cents must be non-negative");
  }

  if (latitude < -90 || latitude > 90) {
    throw new Error("Invalid latitude");
  }

  if (longitude < -180 || longitude > 180) {
    throw new Error("Invalid longitude");
  }

  const now = new Date();
  const dateFormatted = new Date(date);

  if (dateFormatted < now) {
    throw new Error("The date must be in the future");
  }

  const event = await createEventOnDatabase({
    name,
    ticketPriceInCents,
    latitude,
    longitude,
    date: dateFormatted,
    ownerId
  });

  return event;
}
