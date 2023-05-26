import request from "supertest";
import app from "../src/app.js";
import db from "../src/database/models/index.js";
import { v4 as uuid } from "uuid";


describe('Application tests', () => {
	let thisDb = db;
	let trainer;

	const createUser = async (login) => {
		trainer = {
			"lastname": "test",
			"firstname": "test",
			"login": login,
			"password": "password",
			"birthday": "2000-01-01"
		};
		const response = await request(app).post("/users").send(trainer);
		return trainer.login;
	};

	const getPokemon = (login) => {
		return {
			"species": "body.species",
			"name": "body.name",
			"level": 13,
			"genre": "body.genre",
			"size": 30,
			"weight": 20,
			"shiny": false,
		};
	};

	beforeAll(async () => {
		await thisDb.sequelize.sync({ force: true });
	})

	describe('POST Pokemons', () => {

		describe("given all informations", () => {

		})

		describe("when some information are missing or wrong", () => {
			it("should respond with 400 when missing", async () => {
				trainer = await createUser("login");
				const response = await request(app).post("/users/" + trainer + "/pokemons").send({});
				expect(response.statusCode).toBe(400);
				expect(response.body.error).toBeDefined();
			})
			it("should respond with 400 when wrong", async () => {
				let pokemon = await getPokemon(trainer);
				pokemon.size = "test";
				const response = await request(app).post("/users/" + trainer + "/pokemons").send(pokemon);
				expect(response.statusCode).toBe(400);
				expect(response.body.error).toBeDefined();
			})
		})
	});

	afterAll(async () => {
		await thisDb.sequelize.close();
	})
})