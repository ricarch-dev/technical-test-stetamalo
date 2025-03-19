// PokemonContext.js
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';


const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon debe usarse dentro de un PokemonProvider');
  }
  return context;
}
PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };