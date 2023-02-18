import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

  const MobilizerModal = (args) => {
  const [modal, setModal] = useState(false);
  const [modalCamara, setModalCamara] = useState(false);

  const toggle = () => setModal(!modal);

const guardarFoto = () => {
    setModal(!modal)
    setModalCamara(!modalCamara)
}

  return (
    <>
      <Button
        color="primary"
        onClick={guardarFoto}
      >
        Guardar
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalBody>
           <p>
            ACEPTA GUARDAR LA FOTO ?
           </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={guardarFoto}>
            Guardar
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MobilizerModal;
