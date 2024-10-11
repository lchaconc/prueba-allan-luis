import { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaFemale, FaMale, FaQuestion } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { TbTrashXFilled } from "react-icons/tb";

export default function TablaPaginada({
  data,
  recordsPerPage,
  handleEliminarUsuario,
  handleAbrirModal,
}) {
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
          <tr className="text-center">
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Género</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.nombre}</td>
              <td>{record.apellido}</td>
              <td>{record.correo}</td>
              <td>
                {record.genero === "F" ? (
                  <>
                    <FaFemale color="pink" />F
                  </>
                ) : record.genero === "M" ? (
                  <>
                    <FaMale color="blue" />M
                  </>
                ) : (
                  <>
                    <FaQuestion color="gray" />
                    Otro
                  </>
                )}
              </td>
              <td
                className="text-center"
                role={"button"}
                onClick={() => handleAbrirModal(record.id, "edicion")}
              >
                <HiOutlinePencilAlt color="green" />
              </td>
              <td
                className="text-center"
                role={"button"}
                onClick={() => handleEliminarUsuario(record.id)}
              >
                <TbTrashXFilled color="red" />
              </td>
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
          <IoIosArrowDropleftCircle /> Anterior
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
