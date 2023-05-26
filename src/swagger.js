import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: { title: "PC Pokemon API", version: "1.0.0" },
	},
	apis: ["./src/routes/*.js", "./src/database/models/Trainer.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	app.get("/api-docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
};

export default swaggerDocs;