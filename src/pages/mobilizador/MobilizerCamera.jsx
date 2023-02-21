import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const videoConstraints = {
  width: 1500,
  height: 720,
  facingMode: { exact: "environment" }
};

const MobilizerCamera = (args) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [modalCamara, setModalCamara] = useState(false);
  const [modal, setModal] = useState(false);

  const captureFoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const imagen = webcamRef.current;
  const blob = fetch(imagen).then((response) => response.blob());
  const file = new File([blob], "Foto del movilizador", {
    type: ("image/png", "image/jpeg", "image/svg", "image/webp"),
    lastModified: Date.now(),
  });

  const openModalCamara = () => {
    setModalCamara(true);
  };
  const closeModalCamara = () => {
    setModalCamara(false);
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);

    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(url, formData, config)
      .then(response => response)
      .catch((error) => alert(error));
  };

  return (
    <>
      <Button
        color="dark"
        size="sm"
        onClick={openModalCamara}
        className="botonFotos"
      >
        Tomar Fotos
      </Button>
      {modalCamara && (
        <Modal isOpen={modalCamara} {...args}>
          <ModalBody>
            <Webcam
              ref={webcamRef}
              audio={false}
              videoConstraints={videoConstraints}
              screenshotFormat={
                ("image/png", "image/jpeg", "image/svg", "image/webp")
              }
              mirrored={true}
              className="camara"
            />
            <Button onClick={captureFoto} className="mb-2" color="primary">
              Sacar Foto
            </Button>
            {url && (
              <div>
                <img src={url} alt="captura de foto" />
                <Button
                  onClick={() => setUrl(null)}
                  className="mt-2"
                  color="danger"
                >
                  Eliminar Foto
                </Button>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                openModal();
                closeModalCamara();
              }}
            >
              Guardar
            </Button>
            <Button color="danger" onClick={closeModalCamara}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* MODAL ACEPTACION */}

      {modal && (
        <Modal isOpen={modal} {...args}>
          <ModalBody>
            <h3>
              <b>¿Desdea guardar la foto?</b>
            </h3>
            <p>Una vez que acepte guarda la foto no se podra volver atras</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                closeModal();
                closeModalCamara();
              }}
            >
              Aceptar
            </Button>
            <Button
              color="danger"
              onClick={() => {
                closeModal();
                openModalCamara();
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default MobilizerCamera;
