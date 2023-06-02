import React from "react";
import "./PokeCard.css";

type PokeCardProps = {
  pokemonName: string;
  pokemonNumber: number;
  pokemonImage: string;
};

export function PokeCard({
  pokemonName,
  pokemonNumber,
  pokemonImage,
}: PokeCardProps) {
  return (
    <div className="poke-card">
      <div>
        <h1>{pokemonName}</h1>
        <h1>#{pokemonNumber}</h1>
      </div>
      <img src={pokemonImage} alt="pokeimagen"/>
    </div>
  );
}
