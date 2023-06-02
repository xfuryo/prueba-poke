import React, { useEffect, useState } from "react";
import { PokeApi } from "../../services/PokeApi";
import { PokeCard } from "../pokecard/PokeCard";
import { Pokemon } from "../../interfaces/PokemonInterface";
import "./PokeApp.css";


export function PokeApp() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>();
  const [pokemonType, setPokemonType] = useState<any[]>();
  const [selectedType, setSelectedType] = useState();
  const [visibility, setVisibility] = useState<boolean>(false);

  const getTypes = async () => {
    const type = await PokeApi.getTypes();
    setPokemonType(type.results);
  };

  const getPokemonTypes = async () => {
    const pokemonList = await PokeApi.getPokemonByType(
      selectedType || "normal"
    );
    const pokemonPromise = pokemonList.pokemon
      .slice(0, 10)
      .map((pokemon: any) => PokeApi.getPokemon(pokemon.pokemon.url));
    const pokemonDetails = await Promise.all(pokemonPromise);

    setPokemonData(
      pokemonDetails.map((pd) => {
        return {
          name: pd.name,
          pokeDexNumber: pd.id,
          image: pd.sprites.other.dream_world.front_default,
        };
      })
    );
  };

  const handleTypeValue = (event: any) => {
    setSelectedType(event.target.value);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    getPokemonTypes();
  }, [selectedType]);

  

  return (
    <div className="pokemon-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png" alt="logo"></img>
      <div>
        <button onClick={handleVisibility} className="btn-mostrar">
          {visibility ? "ocultar" : "mostrar"}
        </button>
        <select className="sltn-tipo" onChange={(event) => handleTypeValue(event)}>
          {pokemonType &&
            pokemonType.length > 0 &&
            pokemonType.map((pt) => <option  value={pt.name}>{pt.name}</option>)}
        </select>
      </div>

      <div className="card-container">
        {visibility &&
          pokemonData &&
          pokemonData.length > 0 &&
          pokemonData.map((pokemon) => (
            <PokeCard
              pokemonName={pokemon.name}
              pokemonNumber={pokemon.pokeDexNumber}
              pokemonImage={pokemon.image}
            />
          ))}
      </div>
    </div>
  );
}
