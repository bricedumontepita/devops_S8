import express from "express";
import apicache from "apicache";

const defaultRouter = express.Router();

defaultRouter.use((req, res) => {
  res.status(404).send({ error: 'URL not found' });
});

export default defaultRouter;
