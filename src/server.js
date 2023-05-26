import app from "./app.js";
import db from "./database/models/index.js";
import TrainerService from "./services/TrainerService.js";

(async () => {
	try {
		await db.sequelize.sync();
	} catch (error) {
		console.log("Failed to sync db: " + error);
		throw error;
	}
})();

const PORT = process.env.PORT || 80;
app.listen(PORT, async () => {
	console.log("Listening port " + PORT);

	try {
		if (!TrainerService.trainerExists("leopkmn")) {
			await TrainerService.createTrainer({
				"lastname": "Pokemaniac",
				"firstname": "Leo",
				"login": "leopkmn",
				"password": "cynthia",
				"birthday": "1999-10-08"
			});
		}
	} catch (e) {
		console.log(e);
	}
});
