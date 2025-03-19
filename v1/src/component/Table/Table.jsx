import PropTypes from "prop-types";
import Swal from "sweetalert2";

function PokemonTable({ pokemonData, currentPage, pageSize, onSelectPokemon }) {
  const handleSelectPokemon = (pokemon) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "¡Excelente! Dirigete a los detalles y veras a tu Pokemon",
      showConfirmButton: false,
      timer: 3500,
    }).then(() => {
      onSelectPokemon(pokemon);
    });
  };

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            Name
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            ID
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            URL
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            Accion
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {pokemonData.map((pokemon, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{" "}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
              {index + 1 + (currentPage - 1) * pageSize}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
              {pokemon.url}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
              <button
                onClick={() => handleSelectPokemon(pokemon)}
                type="button"
                className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Seleccionar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
PokemonTable.propTypes = {
  pokemonData: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPokemonCount: PropTypes.number.isRequired,
  onSelectPokemon: PropTypes.number.isRequired,
};

export default PokemonTable;
