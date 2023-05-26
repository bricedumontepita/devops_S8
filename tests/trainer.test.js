import request from "supertest";
import app from "../src/app.js";
import db from "../src/database/models/index.js";
import { v4 as uuid } from "uuid";

const getUser = () => {
	return {
		"lastname": "test",
		"firstname": "test",
		"login": uuid(),
		"password": "password",
		"birthday": "2000-01-01"
	};
};

describe('Application tests', () => {
	let thisDb = db;

	beforeAll(async () => {
		await thisDb.sequelize.sync({ force: true });
	})

	describe('POST Trainer', () => {

		describe("given all informations", () => {
			it("should respond with 201 status code", async () => {
				const response = await request(app).post("/users").send(getUser())
				expect(response.statusCode).toBe(201)
			})
			it("should respond with a json object without error", async () => {
				const response = await request(app).post("/users").send(getUser())
				expect(response.body.error).not.toBeDefined()
			})
			it("should respond with 409 if user already existing", async () => {
				const user = getUser();
				await request(app).post("/users").send(user);
				const response = await request(app).post("/users").send(user);
				expect(response.statusCode).toBe(409);
				expect(response.body.error).toBeDefined();
			})
		})

		describe("when some information are missing", () => {
			it("should respond with 400 status code", async () => {
				const response = await request(app).post("/users").send({})
				expect(response.statusCode).toBe(400);
				expect(response.body.error).toBeDefined();
			})
		})
	});

	afterAll(async () => {
		await thisDb.sequelize.close();
	})
})