import Trainers from "./models/Trainer.js";


class TrainerDAO {
  static trainerExists = async (login) => {
    return (await this.getTrainerByLogin(login)) != null;
  }

  static createTrainer = async (trainer) => {
    try {
      if (await this.trainerExists(trainer.login)) {
        throw {
          status: 409,
          message: `Trainer with the login '${trainer.login}' already exists`,
        };
      }

      const newTrainer = Trainers.create(trainer);
      return newTrainer;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  static getTrainerByLogin = async (login) => {
    return Trainers.findOne({
      where: {
        login,
      },
    });
  };

  static getTrainerById = async (userId) => {
    return Trainers.findByPk(userId);
  };

  static getTrainers = async (number, page) => {
    try {
      const trainers = await Trainers.findAll({
        limit: Number(number),
        offset: Number(page * number),
      });
      return trainers;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  static upsetTrainer = async (datas) => {
    try {
      const [newTrainer, hasBeenCreated] = await Trainers.upsert(datas);
      return { newTrainer, hasBeenCreated };
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  static updateTrainer = async (login, changes, canCreate = false) => {
    try {
      if (!(await this.trainerExists(login))) {
        throw {
          status: 404,
          message: `Trainer doesn't exist`,
        };
      }
      const data = await Trainers.update(changes, {
        where: {
          login,
        },
      });
      return { changes, data };
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  static deleteTrainer = async (login) => {
    try {
      if (!(await this.trainerExists(login))) {
        throw {
          status: 404,
          message: `Trainer doesn't exist`,
        };
      }
      return await Trainers.destroy({
        where: {
          login: login,
        },
      });
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  }
}

export default TrainerDAO;