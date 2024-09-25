

import Modal from 'react-bootstrap/Modal';

export default function Gmodal({ showModal, setShowModal } ) { 

  
  
  

  return (
  
  

      <Modal show={showModal} onHide={ ()=> setShowModal(false)  }>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          pie
        </Modal.Footer>
      </Modal>
  
  );
}

