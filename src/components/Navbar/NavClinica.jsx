import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";
import { NavbarLogo } from "./NavbarLogo.jsx";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <Navbar >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link to="/">
            <NavbarLogo />
          </Link>
        </NavbarBrand>
        <NavbarContent className=" sm:flex gap-4">
          <NavbarItem>
            <Link color="foreground" to="pacientes">
              Pacientes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="medicos" aria-current="page" color="foreground">
              Medicos
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

    </Navbar>
  );
}
