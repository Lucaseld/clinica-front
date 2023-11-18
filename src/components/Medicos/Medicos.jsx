import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import axios from "axios";
import ModalWindow from "../ModalMedicos/ModalWindow";
import ModalEditMed from "../ModalEditMedicos/ModalEditMed";
import Banner from "../Banner/Banner";
import ModalDelete from "../ModalDelete/ModalDelete"

const columns = [
  { name: "ID", uid: "id" },
  { name: "NOMBRE", uid: "nombre" },
  { name: "APELLIDO", uid: "apellido" },
  { name: "DIRECCION", uid: "direccion" },
  { name: "LOCALIDAD", uid: "localidad" },
  { name: "PROVINCIA", uid: "provincia" },
  { name: "TELEFONO", uid: "telefono" },
  { name: "DNI", uid: "dni" },
  { name: "FECHA NAC", uid: "fechaNacimiento" },
  { name: "MATRICULA", uid: "matricula" },
  { name: "ESPECIALIDAD", uid: "especialidad" },
  { name: "FECHA INGRESO", uid: "fechaIngreso" },
  { name: "ACCIONES", uid: "actions" },
];

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [modalError, setModalError] = useState(false);

  const cargarMedicos = () => {
    axios
      .get("https://clinica-back-dev-jqsb.4.us-1.fl0.io/medicos")
      .then((response) => {
        setMedicos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de médicos: " + error);
      });
  };

  useEffect(() => {
    cargarMedicos();
  }, []);

  const handleModalError = () => {
    setModalError(false)
  }

  const renderCell = React.useCallback((medico, columnKey) => {
    const cellValue = medico[columnKey];

    const deleteMedico = (id) => {
        axios.delete(`ep-square-butterfly-96990976.ap-southeast-1.aws.neon.fl0.io/medicos/${id}`)
        .then((response) => {
          console.log(`El médico con el id ${id} fue eliminado`);
          cargarMedicos();
        })
      .catch ((error, response) => {
        console.log(`Error al eliminar el médico con el id ${id}`, error ,response);
        setModalError(true)
      })
    };

    switch (columnKey) {
      case "id":
        return <span>{cellValue}</span>;
      case "nombre":
      case "apellido":
      case "direccion":
      case "localidad":
      case "provincia":
      case "telefono":
      case "dni":
      case "fechaNacimiento":
      case "matricula":
      case "especialidad":
      case "fechaIngreso":
        return <span>{cellValue}</span>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar médico">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ModalEditMed listaDeMedicos={medico} 
                cargarMedicos={cargarMedicos}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar médico">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() =>deleteMedico(medico.id)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table isStriped aria-label="Tabla de Médicos">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={medicos}>
          {(medico) => (
            <TableRow key={medico.id}>
              {(columnKey) => (
                <TableCell>{renderCell(medico, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalWindow cargarMedicos={cargarMedicos} />
      <ModalDelete 
      showModal = {modalError}
      handleModalError = {handleModalError}/>
      <Banner />
    </>
  );
}
