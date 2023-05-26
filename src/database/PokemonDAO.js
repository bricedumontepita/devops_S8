import Pokemons from "./models/Pokemon.js";

class PokemonDAO {
  // static pokemonExists = async (login) => {
  //     return (await this.getPokemonByLogin(login)) != null;
  // }

  static createPokemon = async (pokemon) => {
    try {
      const newPokemon = Pokemons.create(pokemon);
      return newPokemon;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  static getPokemonByFilter = async (filter) => {
    return Pokemons.findOne({
      where: filter,
    });
  };

  static getPokemonById = async (userId) => {
    return Pokemons.findByPk(userId);
  };

  static getPokemons = async (number, page, filter) => {
    try {
      const pokemons = await Pokemons.findAll({
        where: filter,
        limit: Number(number),
        offset: Number(page * number),
      });
      return pokemons;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  // static upsetPokemon = async (datas) => {
  //     try {
  //         const [newPokemon, hasBeenCreated] = await Pokemons.upsert(datas);
  //         return { newPokemon, hasBeenCreated };
  //     } catch (error) {
  //       throw { status: error?.status || 500, message: error?.message || error };
  //     }
  // };

  // static updatePokemon = async (login, changes, canCreate = false) => {
  //     try {
  //         if (!(await this.pokemonExists(login))) {
  //             throw {
  //                 status: 404,
  //                 message: `Pokemon doesn't exist`,
  //             };
  //         }
  //         const data = await Pokemons.update(changes, {
  //             where: {
  //                 login,
  //             },
  //         });
  //         return { changes, data };
  //     } catch (error) {
  //       throw { status: error?.status || 500, message: error?.message || error };
  //     }
  // };

  // static deletePokemon = async (login) => {
  //     try {
  //         if (!(await this.pokemonExists(login))) {
  //             throw {
  //                 status: 404,
  //                 message: `Pokemon doesn't exist`,
  //             };
  //         }
  //         return await Pokemons.destroy({
  //             where: {
  //                 login: login,
  //             },
  //         });
  //     } catch (error) {
  //         throw { status: error?.status || 500, message: error?.message || error };
  //     }
  // }
}

export default PokemonDAO;