import Modal from 'react-bootstrap/Modal';
import FormUsuarios from './FormUsuarios';

export default function Gmodal({ showModal, setShowModal, modoModal, usuarioSeleccionado, guardarDatosForm } ) { 

  

  return (
  
  

      <Modal show={showModal} onHide={ ()=> setShowModal(false)  }>
        <Modal.Header closeButton>
          <Modal.Title>
            {
              modoModal === "edicion" &&  "Edición de registro"
            }

{
              modoModal === "nuevo" &&  "Insercción de registro"
            }

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormUsuarios 
          usuarioSeleccionado={usuarioSeleccionado}
          guardarDatosForm={guardarDatosForm}
            />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
  
  );
}

