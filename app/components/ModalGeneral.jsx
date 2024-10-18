import Modal from "react-bootstrap/Modal";
import FormUsuarios from "./FormUsuarios";
import FormUsuariosPrueba from "./FormUsuariosPrueba";

export default function ModalGeneral({
  show,
  setShow,
  modoModal,
  seleccionado,
  enviarDatos,
  enviarDatosNuevoUsuario,
  enviandoDatos,
}) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoModal === "edicion" && <h2>Actualizar datos de usuario</h2>}
            {modoModal === "insertar" && <h2>Agregar usuario nuevo</h2>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormUsuariosPrueba
            seleccionado={seleccionado}
            enviarDatos={enviarDatos}
            enviandoDatos={enviandoDatos}
            enviarDatosNuevoUsuario={enviarDatosNuevoUsuario}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
