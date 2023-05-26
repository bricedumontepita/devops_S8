import express from "express";
import bodyParser from "body-parser";
import trainerRouter from "./routes/trainerRoutes.js";
import defaultRouter from "./routes/defaultRoutes.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import authentificationRouter from "./routes/authentificationRoutes.js";
import swaggerDocs from "./swagger.js";

const app = express();

app.use(bodyParser.json());

swaggerDocs(app, 80);
app.use("/users", trainerRouter);
app.use("/", pokemonRouter);
app.use("/", authentificationRouter);
app.use("/", defaultRouter);

export default app;