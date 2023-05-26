import { DataTypes, Model } from 'sequelize';
import db from "./index.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Trainer:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 2
 *         firstname: 
 *           type: string
 *           example: Johnny
 *         lastname: 
 *           type: string
 *           example: DEPP
 *         login:
 *           type: string
 *           example: toto_45
 *         password:
 *           type: string
 *           example: 
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */
class Trainer extends Model { }

Trainer.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  sequelize: db.sequelize,
  modelName: 'trainers',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Trainer;