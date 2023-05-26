import TrainerService from "../services/TrainerService.js";
import moment from "moment";

const createTrainer = async (req, res) => {
  const { body } = req;

  if (
    !body.firstname ||
    !body.lastname ||
    !body.login ||
    !body.password ||
    !body.birthday
  ) {
    res
      .status(400)
      .send({
        error:
          "One of the following keys is missing or is empty in request body: 'firstname', 'lastname', 'login', 'password', 'birthday'",
      });
    return;
  }
  var birthday = moment(body.birthday);
  if (birthday.isValid()) {
    birthday = birthday.format("YYYY-MM-DD");
  } else {
    res
      .status(400)
      .send({ error: "Date format is invalid. Valid example: 2000-01-31" });
    return;
  }

  try {
    const trainerToCreate = {
      firstname: body.firstname,
      lastname: body.lastname,
      login: body.login,
      password: body.password,
      birthday: body.birthday,
    };
    const newTrainer = await TrainerService.createTrainer(trainerToCreate);
    res.status(201).send({ id: newTrainer.id, login: newTrainer.login });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

const getTrainers = async (req, res) => {
  const { pageSize, page } = req.query;

  try {
    const trainers = await TrainerService.getTrainers(pageSize, page);
    res.status(200).send(trainers);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

const getTrainerByLogin = async (req, res) => {
  const { login } = req.params;

  try {
    const trainer = await TrainerService.getTrainerByLogin(login);
    res.status(200).send(trainer);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

const updateTrainer = async (req, res) => {
  const { login } = req.params;
  const { body } = req;

  try {
    const newTrainer = await TrainerService.updateTrainer(login, body, false);
    return res.status(200).send({ id: newTrainer.id, login: newTrainer.login });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

const upsetTrainer = async (req, res) => {
  const { login } = req.params;
  const { body } = req;

  if (
    !body.firstname ||
    !body.lastname ||
    !body.login ||
    !body.password ||
    !body.birthday
  ) {
    res
      .status(400)
      .send({
        error:
          "One of the following keys is missing or is empty in request body: 'firstname', 'lastname', 'login', 'password', 'birthday'",
      });
    return;
  }
  try {
    const changes = {
      firstname: body.firstname,
      lastname: body.lastname,
      login: body.login,
      password: body.password,
      birthday: body.birthday,
    };
    const { newTrainer, hasBeenCreated } = await TrainerService.updateTrainer(login, changes, true);
    if (hasBeenCreated) {
      res.status(201);
    } else {
      res.status(200);
    }
    return res.send({ id: newTrainer.id, login: newTrainer.login });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
}

const deleteTrainer = async (req, res) => {
  const { login } = req.params;
  try {
    await TrainerService.deleteTrainer(login);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

export default {
  createTrainer,
  getTrainers,
  getTrainerByLogin,
  updateTrainer,
  upsetTrainer,
  deleteTrainer
};