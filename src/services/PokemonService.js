import Pokemons from "../database/PokemonDAO.js";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';
import TrainerService from "./TrainerService.js";
import db from "../database/models/index.js";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 0;

class PokemonService {

  static isValidFilter = (filters, name) => {
    if (filters[name + "Min"] || filters[name + "Max"]) {
      return filters[name + "Min"] && filters[name + "Max"];
    }
    return true;
  }

  static isValidLevel = (level) => {
    return this.isValidNumber(level) && level >= 0 && level <= 100;
  }

  static isValidNumber = (number) => {
    return !isNaN(number);
  }

  static isValidBool = (bool) => {
    return bool === true || bool === false;
  }

  static createFilterNumber(filter, name, nameMin, nameMax) {
    filter[name] = filter[nameMin];
    // {
    //[db.sequelize.Op]: [Number(filter[nameMin]), Number(filter[nameMax])]
    // }
    delete filter[nameMin];
    delete filter[nameMax];
  }

  static createFilterString(filter, name) {
    // filter[name] = {
    //   $like: "%" + filter[name] + "%"
    // }
  }

  static createPokemon = async (pokemon) => {
    try {
      await TrainerService.getTrainerByLogin(pokemon.login_trainer);
    } catch (error) {
      throw {
        status: 404,
        message: `Trainer doesn't exist.`,
      };
    }
    try {
      const newPokemon = await Pokemons.createPokemon(pokemon);
      return newPokemon;
    } catch (error) {
      throw error;
    }
  };

  static getPokemons = async (number, page, filter = {}) => {
    if (!number) {
      number = DEFAULT_PAGE_SIZE;
    }
    if (!page) {
      page = DEFAULT_PAGE;
    }
    if (filter.sizeMin) {
      this.createFilterNumber(filter, "size", "sizeMin", "sizeMax");
    }
    if (filter.levelMin) {
      this.createFilterNumber(filter, "level", "levelMin", "levelMax");
    }
    if (filter.weightMin) {
      this.createFilterNumber(filter, "weight", "weightMin", "weightMax");
    }

    if (filter.species) {
      this.createFilterString(filter, "species");
    }
    if (filter.name) {
      this.createFilterString(filter, "name");
    }

    try {
      const pokemons = await Pokemons.getPokemons(number, page, filter);
      return { pokemons: pokemons.map((poke) => ({ id: poke.id, name: poke.name })), number, page, filter };
    } catch (error) {
      throw error;
    }
  };

  static getPokemonByFilter = async (filter) => {
    try {
      const pokemon = await Pokemons.getPokemonByFilter(filter);
      if (!pokemon) {
        throw {
          status: 404,
          message: `Pokemon doesn't exist`,
        };
      }
      return pokemon;
    } catch (error) {
      throw error;
    }
  };

  // static updatePokemon = async (login, changes, canCreate = false) => {
  //   try {
  //     if (changes.password) {
  //       changes.password = this.encryptPassword(changes.password);
  //     }
  //     if (canCreate) {
  //       changes = {
  //         ...changes,
  //         id: (await this.getPokemonByLogin(login)).id
  //       }
  //       return Pokemons.upsetPokemon(changes);
  //     }
  //     return Pokemons.updatePokemon(login, changes);
  //   } catch (error) {
  //     throw { status: error?.status || 500, message: error?.message || error };
  //   }
  // };

  // static deletePokemon = async (login) => {
  //   try {
  //     return await Pokemons.deletePokemon(login);
  //   } catch (error) {
  //     throw { status: error?.status || 500, message: error?.message || error };
  //   }
  // };
}

export default PokemonService;
