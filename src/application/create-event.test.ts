import { createEvent } from "./create-event.js";

describe("create events", () => {
  it("should create a new event with valid data", async () => {
    const {
      name,
      ticket_price_in_cents: ticketPriceInCents,
      latitude,
      longitude,
      date,
      owner_id: ownerId
    } = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const output = await createEvent({
      name,
      ticketPriceInCents,
      latitude,
      longitude,
      date: new Date(date),
      ownerId
    });

    expect(output.name).toBe(name);
  });

  it("should return 400 for invalid owner_id", async () => {
    const {
      name,
      ticket_price_in_cents: ticketPriceInCents,
      latitude,
      longitude,
      date,
      owner_id: ownerId
    } = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: "invalid-uuid"
    };

    const output = await createEvent({
      name,
      ticketPriceInCents,
      latitude,
      longitude,
      date: new Date(date),
      ownerId
    }).catch((error) => error);

    expect(output).toBeInstanceOf(Error);
    expect((output as Error).message).toBe("Invalid owner_id");
  });

  it("should return 400 for negative ticket_price_in_cents", async () => {
    const {
      name,
      ticket_price_in_cents: ticketPriceInCents,
      latitude,
      longitude,
      date,
      owner_id: ownerId
    } = {
      name: "FSC presencial",
      ticket_price_in_cents: -1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const output = await createEvent({
      name,
      ticketPriceInCents,
      latitude,
      longitude,
      date: new Date(date),
      ownerId
    }).catch((error) => error);

    expect(output).toBeInstanceOf(Error);
    expect((output as Error).message).toBe(
      "The ticket_price_in_cents must be non-negative"
    );
  });

  it("should return 400 for invalid latitude", async () => {
    const {
      name,
      ticket_price_in_cents: ticketPriceInCents,
      latitude,
      longitude,
      date,
      owner_id: ownerId
    } = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -100,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const output = await createEvent({
      name,
      ticketPriceInCents,
      latitude,
      longitude,
      date: new Date(date),
      ownerId
    }).catch((error) => error);

    expect(output).toBeInstanceOf(Error);
    expect((output as Error).message).toBe("Invalid latitude");
  });

  it("should return 400 for invalid longitude", async () => {
    const {
      name,
      ticket_price_in_cents: ticketPriceInCents,
      latitude,
      longitude,
      date,
      owner_id: ownerId
    } = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -200,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const output = await createEvent({
      name,
      ticketPriceInCents,
      latitude,
      longitude,
      date: new Date(date),
      ownerId
    }).catch((error) => error);

    expect(output).toBeInstanceOf(Error);
    expect((output as Error).message).toBe("Invalid longitude");
  });

  it("should return 400 for past date", async () => {
    const {
      name,
      ticket_price_in_cents: ticketPriceInCents,
      latitude,
      longitude,
      date,
      owner_id: ownerId
    } = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() - 2),
      owner_id: crypto.randomUUID()
    };

    const output = await createEvent({
      name,
      ticketPriceInCents,
      latitude,
      longitude,
      date: new Date(date),
      ownerId
    }).catch((error) => error);

    expect(output).toBeInstanceOf(Error);
    expect((output as Error).message).toBe("The date must be in the future");
  });
});
