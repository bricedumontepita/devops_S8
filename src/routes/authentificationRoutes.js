import express from "express";
import AuthentificationController from "../controllers/AuthentificationController.js";

const authentificationRouter = express.Router();

authentificationRouter.get('/authorize', AuthentificationController.authorize);
authentificationRouter.post('/token', AuthentificationController.token);

export default authentificationRouter;
