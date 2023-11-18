import React from 'react';
import { Typography } from "@material-tailwind/react";
import './Footer.css'

const Footer = () => {
  return (
    <div className='container-footer'>
    <footer className="bg-gray-200 py-4">
      <hr className="my-4 border-gray-400" />
      <div className="container mx-auto text-center">
        <Typography variant="body2" color="textPrimary">
          &copy; 2023 Argentina Programa Nivel 3 TP-Final Lucas Liotta
        </Typography>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
