import PropTypes from "prop-types";

function TablaDetallesPokemon({ pokemonDetails }) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Nombre
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Peso
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Altura
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Habilidades
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Tipo
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            XP Base
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {pokemonDetails ? (
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {pokemonDetails.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {pokemonDetails.weight}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {pokemonDetails.height}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {pokemonDetails.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {pokemonDetails.types.map((type) => type.type.name).join(", ")}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {pokemonDetails.base_experience}
            </td>
          </tr>
        ) : (
          <tr>
            <td
              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              colSpan="6"
            >
              Selecciona un Pokémon para ver sus detalles.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
TablaDetallesPokemon.propTypes = {
  pokemonDetails: PropTypes.object, // Valida la propiedad pokemonDetails
};

export default TablaDetallesPokemon;
