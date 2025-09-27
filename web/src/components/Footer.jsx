import React from "react";
import logo from "/images/logo02.png";

const Footer = () => (
  // 1. Reduced vertical padding: changed 'py-6' to 'py-4'.
  <footer className="bg-green-600 text-white py-4 flex flex-col items-center">
    
    {/* Logo */}
    {/* 2. Removed 'mb-4' (margin-bottom) to reduce space below the logo. */}
    <div>
      <img 
        src={logo} 
        alt="Delicias Express" 
        // 3. Maintained the logo size, but consider using Tailwind's 'h-20' or 'h-24' for a standard height.
        style={{ height: "90px", width: "auto" }} 
      />
    </div>

    {/* Horizontal Line (Optional: If you want to keep the line) */}
    {/* Added a line that visually separates the logo from the text, but without creating extra margin space. */}
    <hr className="w-1/4 border-green-400 my-2" />

    {/* Copyright */}
    {/* 4. Removed 'mt-6' (margin-top) and 'pt-4' (padding-top) from the copyright div.
           This was the biggest cause of the separation between the logo and the text. */}
    <div className="text-center text-sm">
      &copy; 2025 Delicias Express. Todos los derechos reservados.
    </div>
    
  </footer>
);

export default Footer;