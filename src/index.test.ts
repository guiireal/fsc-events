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

  it("should return 400 if /events throw an error", async () => {
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
});
