import { useState, useEffect } from "react";
import { ThreeBody } from "@uiball/loaders";
import PokemonTable from "./Table/Table";
import Pagination from "./NavButtons/NavButtons";
import { usePokemon } from "../context/PokemonContext";

export default function PokemonTableContainer() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const { selectedPokemon, setSelectedPokemon } = usePokemon();

  useEffect(() => {
      
    async function fetchPokemonData() {
      setIsPageChanging(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${
            (currentPage - 1) * pageSize
          }&limit=${pageSize}`
        );
        const data = await response.json();
        setTotalPokemonCount(data.count);
        setPokemonData(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }

      // Simular un tiempo de carga más largo (por ejemplo, 2 segundos)
      setTimeout(() => {
        setIsLoading(false);
        setIsPageChanging(false);
      }, 2000);
    }

    fetchPokemonData();
  }, [currentPage, pageSize]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold leading-6 text-gray-900 mb-5">
        Pokemons
      </h1>
      <p className="mb-4">
        ¡Elige un pokemon de tu preferencia para ver sus detalles a profundidad!
      </p>
      {isLoading || isPageChanging ? (
        <ThreeBody size={55} speed={1.1} color="red" className="center" />
      ) : (
        <>
          <PokemonTable
            pokemonData={pokemonData}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPokemonCount={totalPokemonCount}
            onSelectPokemon={setSelectedPokemon}
          />
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalPokemonCount={totalPokemonCount}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
