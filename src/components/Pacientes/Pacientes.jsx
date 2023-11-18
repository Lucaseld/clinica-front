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
import ModalWindowPac from "../ModalPacientes/ModalWindowPac";
import ModalEditPac from "../ModalEditPacientes/ModalEditPac"
import Banner from '../Banner/Banner'
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
  { name: "ACCIONES", uid: "actions" },
];

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [modalError, setModalError] = useState(false);


  const cargarPacientes = () => {
    axios
    .get("https://clinica-back-dev-jqsb.4.us-1.fl0.io/pacientes")
    .then((response) => {
      setPacientes(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener datos de pacientes: " + error);
    });
  }
  
  useEffect(() => {
    cargarPacientes();
  }, []);

  const handleModalError = () => {
    setModalError(false)
  }

  const renderCell = React.useCallback((paciente, columnKey) => {
    const cellValue = paciente[columnKey];

    const deletePaciente = (id) => {
        axios.delete(`https://clinica-back-dev-jqsb.4.us-1.fl0.io/pacientes/${id}`)
        .then((response) => {
          console.log(`El paciente con el id ${id} fue eliminado exitosamente`)
          cargarPacientes();
        })
      .catch ((error)=> {
        console.log(`Error al eliminar el paciente con el id ${id}`, error);
        setModalError(true)
      })
    }

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
        return <span>{cellValue}</span>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar paciente">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ModalEditPac 
                listaDePacientes = {paciente}
                cargarPacientes={cargarPacientes}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar paciente">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={()=> deletePaciente(paciente.id)} />
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
      <Table isStriped aria-label="Tabla de Pacientes">
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
        <TableBody items={pacientes}>
          {(paciente) => (
            <TableRow key={paciente.id}>
              {(columnKey) => (
                <TableCell>{renderCell(paciente, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalWindowPac 
      cargarPacientes={cargarPacientes}/>
      <ModalDelete 
      showModal = {modalError}
      handleModalError = {handleModalError}/>
      <Banner />
    </>
  );
}