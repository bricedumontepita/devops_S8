import Trainers from "../database/TrainerDAO.js";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 0;

class TrainerService {

  static encryptPassword(rawPassword) {
    return bcrypt.hashSync(rawPassword, 5);
  }

  static areSamePassword(rawPassword, encryptedPassword) {
    return bcrypt.compareSync(rawPassword, encryptedPassword);
  }

  static trainerExists = async (trainer) => {
    return await Trainers.trainerExists(trainer);
  }

  static createTrainer = async (trainer) => {
    const trainerToCreate = {
      ...trainer,
      password: this.encryptPassword(trainer.password),
    };

    try {
      const newTrainer = await Trainers.createTrainer(trainerToCreate);
      return newTrainer;
    } catch (error) {
      throw error;
    }
  };

  static getTrainers = async (number, page) => {
    if (!number) {
      number = DEFAULT_PAGE_SIZE;
    }
    if (!page) {
      page = DEFAULT_PAGE;
    }
    try {
      const trainers = await Trainers.getTrainers(number, page);
      return { users: trainers.map((user) => ({ id: user.id, login: user.login })), number, page };
    } catch (error) {
      throw error;
    }
  };

  static getTrainerByLogin = async (login) => {
    try {
      const trainer = await Trainers.getTrainerByLogin(login);
      if (!trainer) {
        throw {
          status: 404,
          message: `Trainer doesn't exist`,
        };
      }
      return {
        id: trainer.id,
        login: trainer.login,
        lastname: trainer.lastname,
        firstname: trainer.firstname,
        bithday: trainer.birthday
      };
    } catch (error) {
      throw error;
    }
  };

  static updateTrainer = async (login, changes, canCreate = false) => {
    try {
      if (changes.password) {
        changes.password = this.encryptPassword(changes.password);
      }
      if (canCreate) {
        changes = {
          ...changes,
          id: (await this.getTrainerByLogin(login)).id
        }
        return Trainers.upsetTrainer(changes);
      }
      return Trainers.updateTrainer(login, changes);
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  static deleteTrainer = async (login) => {
    try {
      return await Trainers.deleteTrainer(login);
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };
}

export default TrainerService;
