import PropTypes from "prop-types"; // Importa PropTypes

function Pagination({
  currentPage,
  pageSize,
  totalPokemonCount,
  setCurrentPage,
}) {
  const maxPage = Math.ceil(totalPokemonCount / pageSize);

  return (
    <div className="mt-4">
      <button
        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={currentPage === 1}
        className="mr-2 px-4 py-2 border rounded-md bg-gray-200 text-gray-600"
      >
        Anterior
      </button>
      <button
        onClick={() =>
          setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage))
        }
        disabled={currentPage >= maxPage}
        className="px-4 py-2 border rounded-md bg-red-600 text-white"
      >
        Siguiente
      </button>
    </div>
  );
}
// Agrega la validación de props
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPokemonCount: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
