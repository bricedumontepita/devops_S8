import { DataTypes, Model } from 'sequelize';
import db from "./index.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 2
 *         login_trainer: 
 *           type: string
 *           example: jonny
 *         species: 
 *           type: string
 *           example: Pikachu
 *         name:
 *           type: string
 *           example: pika
 *         level:
 *           type: integer
 *           example: 25
 *         size:
 *           type: integer
 *           example: 50
 *         weight: 
 *           type: integer
 *           example: 20
 *         shiny: 
 *           type: boolean
 *           example: false
 */
class Pokemon extends Model { }

Pokemon.init({
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	login_trainer: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	species: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	level: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	genre: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	size: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	weight: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	shiny: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
	sequelize: db.sequelize,
	modelName: 'pokemons',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

export default Pokemon;