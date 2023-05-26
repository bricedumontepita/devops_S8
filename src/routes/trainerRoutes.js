import express from "express";
import apicache from "apicache";

import TrainerController from "../controllers/TrainerController.js";
const trainerRouter = express.Router();
const cache = apicache.middleware;

/**
 * @openapi
 * '/users':
 *  get:
 *     tags:
 *     - Trainers
 *     summary: Return list of trainers
 *     parameters:
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
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       login:
 *                         type: string
 *                 number:
 *                   type: number
 *                   default: 20
 *                 page:
 *                   type: number
 *                   default: 0
 *       400:
 *         description: Bad request
 *       5XX:
 *         description: Server error
 */
trainerRouter.get("/", TrainerController.getTrainers);

/**
 * @openapi
 * '/users/:login':
 *  get:
 *     tags:
 *     - Trainers
 *     summary: Return one trainer
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the trainer
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
 *                  login:
 *                    type: string
 *                  lastname:
 *                    type: number
 *                  firstname:
 *                    type: string
 *                  birthday:
 *                    type: string
 *       400:
 *         description: Bad request
 *       5XX:
 *         description: Server error
 */
trainerRouter.get("/:login", TrainerController.getTrainerByLogin);

/**
 * @openapi
 * '/users':
 *  post:
 *     tags:
 *     - Trainers
 *     summary: Create a trainer
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
trainerRouter.post("/", TrainerController.createTrainer);

/**
 * @openapi
 * '/users/:login':
 *  patch:
 *     tags:
 *     - Trainers
 *     summary: Modify partially a trainer
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the trainer
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
trainerRouter.patch("/:login", TrainerController.updateTrainer);

/**
 * @openapi
 * '/users/:login':
 *  put:
 *     tags:
 *     - Trainers
 *     summary: Modify totaly a trainer
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the trainer
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
trainerRouter.put("/:login", TrainerController.upsetTrainer);

/**
 * @openapi
 * '/users/:login':
 *  delete:
 *     tags:
 *     - Trainers
 *     summary: Remove trainer by login
 *     parameters:
 *      - name: login
 *        in: path
 *        description: The unique login of the trainer
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
trainerRouter.delete("/:login", TrainerController.deleteTrainer);


export default trainerRouter;
