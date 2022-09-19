import app from "../src";
import supertest from "supertest";
import { client } from "../src/database";
import generateTest from "./factories/testFactory";
import { generateToken } from "./factories/tokenFactory";
import { array } from "joi";

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
  it("Must return 401, if token is not valid or not provided", async () => {
    const test = await generateTest();
    const response = await agent
      .post("/test")
      .set("Authorization", `Bearer ${"Yoyoyoyoyoyoyoyoyoyo"}`)
      .send(test);
    expect(response.status).toEqual(401);
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
  it("Must return 404, if tried to register a test with no matching discipline", async () => {
    const test = await generateTest();
    const token = await generateToken();
    test.disciplineId = -1;
    const response = await agent
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send(test);
    expect(response.status).toEqual(404);
  });
  it("Must return 404, if tried to register a test with no matching teacher", async () => {
    const test = await generateTest();
    const token = await generateToken();
    test.teacherId = -1;
    const response = await agent
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send(test);
    expect(response.status).toEqual(404);
  });
  it("Must return 404, if tried to register a test with no matching teacher and discipline combination", async () => {
    const test = await generateTest();
    const token = await generateToken();
    test.teacherId = 2;
    const response = await agent
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send(test);
    expect(response.status).toEqual(404);
  });
});

describe("GET /test/discipline", () => {
  it("Must return 200 and return an array, if token is valid", async () => {
    const token = await generateToken();
    const response = await agent
      .get("/test/discipline")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Must return 401, if token is not valid or not provided", async () => {
    const token = await generateToken();
    const response = await agent.get("/test/discipline").send();
    expect(response.status).toEqual(401);
  });
});
