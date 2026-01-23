import axios from "axios";

axios.defaults.validateStatus = () => true;

describe("POST /events", () => {
  it("should create a new event with valid data", async () => {
    const input = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const response = await axios.post("http://localhost:3000/events", input);

    expect(response.status).toBe(201);
  });

  it("should return 400 for invalid owner_id", async () => {
    const input = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: "invalid-uuid"
    };

    const response = await axios.post("http://localhost:3000/events", input);

    expect(response.status).toBe(400);
  });

  it("should return 400 for negative ticket_price_in_cents", async () => {
    const input = {
      name: "FSC presencial",
      ticket_price_in_cents: -1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const response = await axios.post("http://localhost:3000/events", input);

    expect(response.status).toBe(400);
  });

  it("should return 400 for invalid latitude", async () => {
    const input = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -100,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const response = await axios.post("http://localhost:3000/events", input);

    expect(response.status).toBe(400);
  });

  it("should return 400 for invalid longitude", async () => {
    const input = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -200,
      date: new Date().setHours(new Date().getHours() + 1),
      owner_id: crypto.randomUUID()
    };

    const response = await axios.post("http://localhost:3000/events", input);

    expect(response.status).toBe(400);
  });

  it("should return 400 for past date", async () => {
    const input = {
      name: "FSC presencial",
      ticket_price_in_cents: 1000,
      latitude: -90,
      longitude: -180,
      date: new Date().setHours(new Date().getHours() - 2),
      owner_id: crypto.randomUUID()
    };

    const response = await axios.post("http://localhost:3000/events", input);

    expect(response.status).toBe(400);
  });
});
