import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ThreeBody } from "@uiball/loaders";
import TablaDetallesPokemon from "./Table/TableDetails";

export default function VistaDetallesPokemon({ selectedPokemon }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedPokemon) {
      // Realiza una solicitud adicional para obtener los detalles del Pokémon
      setIsLoading(true);
      fetch(selectedPokemon.url)
        .then((response) => response.json())
        .then((data) => {
          setPokemonDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon details:", error);
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
  }, [selectedPokemon]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <ThreeBody size={55} speed={1.1} color="red" className="center" />
      ) : pokemonDetails ? (
        <div className="pokemon-details">
          <h2 className="text-2xl font-semibold leading-6 text-gray-900 mb-5">
            Detalles de {pokemonDetails.name}
          </h2>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            className="w-40 h-40"
          />
          <TablaDetallesPokemon pokemonDetails={pokemonDetails} />          
        </div>
      ) : (
        <p>Selecciona un Pokémon para ver sus detalles.</p>
      )}
    </div>
  );
}

VistaDetallesPokemon.propTypes = {
  selectedPokemon: PropTypes.object,
};
