import app from "../src/index";
import supertest from "supertest";
import { client } from "../src/database";
import { generateUser, insertUser } from "./factories/userFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE users;`;
});

const agent = supertest(app);

describe("POST /signup", () => {
  it("Must return 201, if registered a user in the correct format", async () => {
    const user = await generateUser();
    const response = await agent.post("/signup").send(user);
    
    expect(response.status).toEqual(201);
  });
});
