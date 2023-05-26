import express from "express";
import apicache from "apicache";

import PokemonController from "../controllers/PokemonController.js";
const pokemonRouter = express.Router();
const cache = apicache.middleware;

/**
 * @openapi
 * '/users/:login/pokemons':
 *  get:
 *     tags:
 *     - Pokemons
 *     summary: Return list of pokemons
 *     parameters:
 *       - name: login
 *         in: path
 *         description: The unique login of the trainer
 *         required: true
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: string
 *         description: La taille d'une page
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Le numéro de la page
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                pokemons:
 *                  type: array
 *                  items: 
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                      name:
 *                        type: string
 *                number:
 *                  type: number
 *                  default: 20
 *                page:
 *                  type: number
 *                  default: 0
 *                filter:
 *                  type: object
 *                  properties:
 *                    page:
 *                      type: number
 *                    pageSize:
 *                      type: string
 *       400:
 *         description: Bad request
 *       5XX:
 *         description: Server error
 */
pokemonRouter.get("/users/:login/pokemons", PokemonController.getPokemons);

/**
 * @openapi
 * '/users/:login/pokemons/:id':
 *  get:
 *     tags:
 *     - Pokemons
 *     summary: Return one pokemon
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the trainer
 *        required: true
 *      - name: id
 *        in: path
 *        description: The unique id of the pokemon
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *                  species:
 *                    type: string
 *                  genre:
 *                    type: string
 *                  size:
 *                    type: number
 *                  weight:
 *                    type: number
 *                  level:
 *                    type: number
 *       400:
 *         description: Bad request
 *       5XX:
 *         description: Server error
 */
pokemonRouter.get("/users/:login/pokemons/:id", PokemonController.getPokemon);

/**
 * @openapi
 * '/users/:login/pokemons':
 *  post:
 *     tags:
 *     - Pokemons
 *     summary: Create a pokemon
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - species
 *              - size
 *              - weight
 *              - level
 *              - genre
 *            properties:
 *              name:
 *                type: string
 *              species:
 *                type: string
 *              genre:
 *                type: string
 *              size:
 *                type: number
 *              weight:
 *                type: number
 *              level:
 *                type: number
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      5XX:
 *        description: Server error
 */
pokemonRouter.post("/users/:login/pokemons", PokemonController.createPokemon);

/**
 * @openapi
 * '/users/:login':
 *  patch:
 *     tags:
 *     - Pokemons
 *     summary: Modify partially a pokemon
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the pokemon
 *        required: true
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - login
 *              - password
 *              - lastname
 *              - firstname
 *              - birthday
 *            properties:
 *              lastname:
 *                type: string
 *              firstname:
 *                type: string
 *              login:
 *                type: string
 *              password:
 *                type: string
 *              birthday:
 *                type: string
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      5XX:
 *        description: Server error
 */
// pokemonRouter.patch("/:login", PokemonController.updatePokemon);

/**
 * @openapi
 * '/users/:login':
 *  put:
 *     tags:
 *     - Pokemons
 *     summary: Modify totaly a pokemon
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the pokemon
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - login
 *              - password
 *              - lastname
 *              - firstname
 *              - birthday
 *            properties:
 *              lastname:
 *                type: string
 *              firstname:
 *                type: string
 *              login:
 *                type: string
 *              password:
 *                type: string
 *              birthday:
 *                type: string
 *     responses:
 *      200:
 *        description: Replaced
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      5XX:
 *        description: Server error
 */
// pokemonRouter.put("/:login", PokemonController.upsetPokemon);

/**
 * @openapi
 * '/users/:login':
 *  delete:
 *     tags:
 *     - Pokemons
 *     summary: Remove pokemon by login
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the pokemon
 *        required: true
 *     responses:
 *      200:
 *        description: Deleted
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      5XX:
 *        description: Server error
 */
// pokemonRouter.delete("/:login", PokemonController.deletePokemon);

export default pokemonRouter;
