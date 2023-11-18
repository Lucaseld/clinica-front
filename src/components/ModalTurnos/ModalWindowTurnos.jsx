import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import axios from "axios";

export default function ModalWindowTurnos({ cargarTurnos }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState({
    idPaciente: "",
    idMedico: "",
    especialidad: "",
    fecha: "",
    hora: "",
    obraSocial: "",
  });

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    // Cargar la lista de pacientes
    axios
      .get("https://clinica-back-dev-jqsb.4.us-1.fl0.io/pacientes")
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de pacientes: " + error);
      });

    // Cargar la lista de medicos
    axios
      .get("https://clinica-back-dev-jqsb.4.us-1.fl0.io/medicos")
      .then((response) => {
        setMedicos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de medicos: " + error);
      });
  }, []); // Se ejecutará solo una vez al montar el componente

  const addTurno = () => {
    axios
      .post("https://clinica-back-dev-jqsb.4.us-1.fl0.io/turnos", formData)
      .then((response) => {
        console.log(response);
        cargarTurnos();
        setShowErrorModal(false);
      })
      .catch((error) => {
        console.error("Error al cargar el turno: " + error);
        setShowErrorModal(true);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Agregar +
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Turno
              </ModalHeader>
              <ModalBody>
                <label>Paciente:</label>
                <select
                  value={formData.idPaciente}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      idPaciente: e.target.value,
                    }))
                  }
                >
                  <option value="">Seleccione paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {`${paciente.nombre} ${paciente.apellido}`}
                    </option>
                  ))}
                </select>

                <label>Médico:</label>
                <select
                  value={formData.idMedico}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      idMedico: e.target.value,
                    }))
                  }
                >
                  <option value="">Seleccione médico</option>
                  {medicos.map((medico) => (
                    <option key={medico.id} value={medico.id}>
                      {`${medico.nombre} ${medico.apellido}`}
                    </option>
                  ))}
                </select>

                <Input
                  label="Especialidad"
                  placeholder="Inserte especialidad"
                  variant="bordered"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                />
                <Input
                  label="Fecha del turno"
                  placeholder="Inserte fecha del turno"
                  variant="bordered"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange}
                />
                <Input
                  label="Fecha del turno"
                  placeholder="Inserte fecha del turno"
                  variant="bordered"
                  name="hora"
                  type="time"
                  value={formData.hora}
                  onChange={handleChange}
                />
                <Input
                  label="Obra Social"
                  placeholder="Inserte obra social"
                  variant="bordered"
                  name="obraSocial"
                  value={formData.obraSocial}
                  onChange={handleChange}
                />
                <div className="flex py-2 px-1 justify-between"></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose} onClick={addTurno}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {showErrorModal && (
        <Modal isOpen={true} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Error</ModalHeader>
                <ModalBody>
                  El médico o el paciente no existe en la base de datos.
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={() => setShowErrorModal(false)}
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

