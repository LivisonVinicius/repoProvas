import app from "../src";
import supertest from "supertest";
import { client } from "../src/database";
import generateTest from "./factories/testFactory";
import { generateToken } from "./factories/tokenFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE tests`;
});

const agent = supertest(app);

describe("POST /test", () => {
  it("Must return 201, if registered a user in the correct format", async () => {
    const test = await generateTest();
    const token = await generateToken();
    const response = await agent
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send(test);
    expect(response.status).toEqual(201);
  });
  it("Must return 404, if tried to register a test with no matching category", async () => {
    const test = await generateTest();
    const token = await generateToken();
    test.categoryId = -1;
    const response = await agent
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send(test);
    expect(response.status).toEqual(404);
  });
  it("Must return 404, if tried to register a test with no matching category", async () => {
    const test = await generateTest();
    const token = await generateToken();
    test.categoryId = -1;
    const response = await agent
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send(test);
    expect(response.status).toEqual(404);
  });
});
