import axios from "axios";

export class PokeApi {

  static POKEAPI = "https://pokeapi.co/api/v2"

  static getPokemonByType = async (type: string) => {
    return PokeApi.handleResponse(await axios.get(`${PokeApi.POKEAPI}/type/${type}`)); 
  };

  static getTypes = async () => {
    return PokeApi.handleResponse(await axios.get(`${PokeApi.POKEAPI}/type`));
  };

  static getPokemon = async (pokemonUrl: string) => {
    return PokeApi.handleResponse(await axios.get(`${pokemonUrl}`));
  };

  static handleResponse = (services: any) => {
    return services.data
  }
  
}
