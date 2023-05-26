import PokemonService from "../services/PokemonService.js";
import moment from "moment";

const createPokemon = async (req, res) => {
  const { body } = req;
  const { login } = req.params;

  if (
    !body.species ||
    !body.level ||
    !body.genre ||
    !body.size ||
    !body.weight ||
    !body.shiny === undefined
  ) {
    res
      .status(400)
      .send({
        error:
          "One of the following keys is missing or is empty in request body: 'species', 'level', 'weight', 'size', 'shiny', 'genre'",
      });
    return;
  }
  if (!PokemonService.isValidLevel(body.level)) {
    res
      .status(400)
      .send({ error: "Level must be between 0 and 100." });
    return;
  }
  if (!PokemonService.isValidNumber(body.weight)) {
    res
      .status(400)
      .send({ error: "Weight must be a number" });
    return;
  }
  if (!PokemonService.isValidNumber(body.size)) {
    res
      .status(400)
      .send({ error: "Size must be a number" });
    return;
  }
  if (!PokemonService.isValidBool(body.shiny)) {
    res
      .status(400)
      .send({ error: "Shiny must be a boolean" });
    return;
  }

  try {
    const pokemonToCreate = {
      login_trainer: login,
      species: body.species,
      name: body.name ? body.name : body.species,
      level: body.level,
      genre: body.genre,
      size: body.size,
      weight: body.weight,
      shiny: body.shiny,
    };
    const newPokemon = await PokemonService.createPokemon(pokemonToCreate);
    res.status(201).send({ id: newPokemon.id, login_trainer: newPokemon.login_trainer });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

const getPokemons = async (req, res) => {
  const { login } = req.params;
  let params = req.query;
  params.login_trainer = login;

  const listInterval = [
    "size",
    "weight",
    "level"
  ];

  listInterval.forEach(element => {
    if (!PokemonService.isValidFilter(params, element)) {
      res
        .status(400)
        .send({ error: element + " must have a min and max value. Example: sizeMin=2&sizeMax=5" });
      return;
    }
  });

  try {
    let newParams = {};
    const allowedParams = [
      "login_trainer",
      "species",
      "name",
      "levelMin",
      "levelMax",
      "genre",
      "sizeMin",
      "weightMin",
      "sizeMax",
      "weightMax",
      "shiny"
    ];
    allowedParams.forEach(element => {
      if (params[element]) {
        newParams[element] = params[element];
      }
    });
    const pokemons = await PokemonService.getPokemons(params.pageSize, params.page, newParams);
    res.status(200).send(pokemons);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

const getPokemon = async (req, res) => {
  const { login, id } = req.params;

  try {
    const pokemon = await PokemonService.getPokemonByFilter({ login_trainer: login, id: id });
    res.status(200).send(pokemon);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ error: error?.message || error });
  }
};

// const updatePokemon = async (req, res) => {
//   const { login } = req.params;
//   const { body } = req;

//   try {
//       const newPokemon = await PokemonService.updatePokemon(login, body, false);
//       return res.status(200).send({ id: newPokemon.id, login: newPokemon.login });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({error: error?.message || error });
//   }
// };

// const upsetPokemon = async (req, res) => {
//   const { login } = req.params;
//   const { body } = req;

//   if (
//     !body.firstname ||
//     !body.lastname ||
//     !body.login ||
//     !body.password ||
//     !body.birthday
//   ) {
//     res
//       .status(400)
//       .send({
//           error:
//             "One of the following keys is missing or is empty in request body: 'firstname', 'lastname', 'login', 'password', 'birthday'",
//       });
//     return;
//   }
//   try {
//       const changes = {
//         firstname: body.firstname,
//         lastname: body.lastname,
//         login: body.login,
//         password: body.password,
//         birthday: body.birthday,
//       };
//       const {newPokemon, hasBeenCreated } = await PokemonService.updatePokemon(login, changes, true);
//       if (hasBeenCreated) {
//         res.status(201);
//       } else {
//         res.status(200);
//       }
//       return res.send({ id: newPokemon.id, login: newPokemon.login });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({error: error?.message || error });
//   }
// }

// const deletePokemon = async (req, res) => {
//   const { login } = req.params;
//   try {
//     await PokemonService.deletePokemon(login);
//     res.sendStatus(204);
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ error: error?.message || error });
//   }
// };

export default {
  createPokemon,
  getPokemons,
  getPokemon,
  // updatePokemon,
  // upsetPokemon,
  // deletePokemon
};