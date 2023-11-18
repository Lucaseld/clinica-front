import React, { useEffect, useState } from "react";
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
import { EditIcon } from "../Medicos/EditIcon.jsx";
import axios from "axios";

export default function ModalEditTurnos({ listaDeTurnos, cargarTurnos}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState({
    idPaciente: listaDeTurnos.idPaciente,
    idMedico: listaDeTurnos.idMedico ,
    especialidad: listaDeTurnos.especialidad,
    fecha: listaDeTurnos.fecha,
    hora: listaDeTurnos.hora,
    obraSocial: listaDeTurnos.obraSocial,
  });
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

 useEffect(() => {
    axios
      .get("https://clinica-back-dev-jqsb.4.us-1.fl0.io/pacientes")
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de pacientes: " + error);
      });


    axios
      .get("https://ep-square-butterfly-96990976.ap-southeast-1.aws.neon.fl0.io/medicos")
      .then((response) => {
        setMedicos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de medicos: " + error);
      });
  }, []);


  const addTurno = () => {
    axios
      .put(`https://ep-square-butterfly-96990976.ap-southeast-1.aws.neon.fl0.io/turnos/${listaDeTurnos.id}`, formData)
      .then((response) => {
        console.log(response);
        cargarTurnos();
      })
      .catch((error) => {
        console.error("Error al cargar el turno: " + error);
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
      <Button
        onPress={onOpen}
        color="foreground"
      >
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Turno
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
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
