import React from "react";
import logo from "/images/logo.png"; // Asegúrate de la ruta correcta

const Footer = () => (
  <footer className="bg-red-600 text-white py-6 flex flex-col items-center">
    {/* Logo */}
    <div className="mb-4">
      <img src={logo} alt="Delicias Express" className="h-16 w-auto" />
    </div>

    {/* Copyright */}
    <div className="mt-6 border-t border-red-400 pt-4 text-center text-sm">
      &copy; 2025 Delicias Express. Todos los derechos reservados.
    </div>
  </footer>
);

export default Footer;
