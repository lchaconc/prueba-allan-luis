import { useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";



export default function TablaPaginada({ data, recordsPerPage }) {
  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(data.length / recordsPerPage);

  // Calcular los registros a mostrar en la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-4">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.nombre}</td>
              <td>{record.apellido}</td>
              <td>{record.correo}</td>
              <td>{record.genero}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <IoIosArrowDropleftCircle />  Anterior
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          className="btn btn-outline-primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente <IoIosArrowDroprightCircle />
        </button>
      </div>
    </div>
  );
}
