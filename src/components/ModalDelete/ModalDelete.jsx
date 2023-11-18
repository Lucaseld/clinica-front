import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function App({ showModal, handleModalError }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (showModal) {
      onOpen();
    }
  }, [showModal, onOpen]);


  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleModalError();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Error al eliminar
              </ModalHeader>
              <ModalBody>
                <p>No se puede eliminar ya que tiene un turno asignado.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
