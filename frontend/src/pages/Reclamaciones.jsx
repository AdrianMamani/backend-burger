import React from "react";
import IdentificacionConsumidorForm from '../components/IdentificacionConsumidorForm.jsx'; 
import DescripcionReclamoForm from '../components/DescripcionReclamoForm.jsx'; 

const Reclamaciones = () => {
  
  // Función placeholder para manejar el envío
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de la reclamación listos para ser enviados.");
    // Aquí iría la lógica para recopilar y enviar los datos de los 3 formularios
  };

  return (
    <div style={{ display: "flex", padding: "40px" }}>
      {/* Columna izquierda - Menú de ayuda */}
      <div className="w-1/4 pr-8 text-sm">
  
        <h3 className="font-extrabold text-lg text-gray-800 mb-4 border-b-2 border-green-500 pb-1">
            CENTRO DE AYUDA
        </h3>
        
        <ul className="list-none p-0 space-y-2">
            
            {/* Estilo para cada elemento del menú */}
            <li className="text-gray-600 hover:text-green-600 cursor-pointer transition duration-200 transform hover:translate-x-1">
            Términos y Condiciones
            </li>
            <li className="text-gray-600 hover:text-green-600 cursor-pointer transition duration-200 transform hover:translate-x-1">
            Términos y Condiciones de Promociones
            </li>
            <li className="text-gray-600 hover:text-green-600 cursor-pointer transition duration-200 transform hover:translate-x-1">
            Políticas de Datos Personales
            </li>
            <li className="text-green-600 font-semibold cursor-pointer transition duration-200 transform hover:translate-x-1">
            Libro de reclamaciones
            </li>
            <li className="text-gray-600 hover:text-green-600 cursor-pointer transition duration-200 transform hover:translate-x-1">
            Derechos ARCO
            </li>
            <li className="text-gray-600 hover:text-green-600 cursor-pointer transition duration-200 transform hover:translate-x-1">
            Zonas de Reparto
            </li>
        </ul>
        </div>

      {/* Columna derecha - Contenido de la Hoja de Reclamación */}
      <div style={{ width: "70%", textAlign: "left" }}>

        {/* 1. Cabecera (Título y Párrafos) */}
        <h2 className="animate-fadeIn" style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "15px", textAlign: "left", marginLeft: "350px" }}>HOJA DE RECLAMACIÓN</h2>
        
        <div style={{ textAlign: "left", margin: "15px 0 30px 0" }}>
            <p 
                style={{ 
                    // Eliminamos 'auto' y usamos '0' o un valor negativo para ML
                    margin: "0 0 0 0px", 
                    maxWidth: "100%", // Usamos 100% para que ocupe el ancho completo si es necesario
                    lineHeight: "1.4" 
                }}
            >
                Conforme a lo establecido en el Código de la Protección y Defensa del
                consumidor este establecimiento cuenta con un Libro de Reclamaciones a
                tu disposición. Registra tu queja o reclamo aquí.
            </p>
            <p 
                style={{ 
                    // Eliminamos 'auto' y usamos '0' o un valor negativo para ML
                    margin: "10px 0 30px 0px", 
                    maxWidth: "100%", 
                    lineHeight: "1.4" 
                }}
            >
                Al presentar tu reclamo autorizas el tratamiento de tus datos personales
            </p>
        </div>
        
        {/* 2. Información de la empresa */}
        <div style={{ fontSize: "16px", marginBottom: "30px" }}>
          <p style={{ margin: "15px 0 0 0" }}>
            <strong style={{ fontWeight: "bold" }}>Fecha:</strong> 25/09/2025
          </p>
          <p style={{ margin: "10px 0 0 0" }}>
            <strong style={{ fontWeight: "bold" }}>Razón Social:</strong> BEMBOS S.A.C.
          </p>
          <p style={{ margin: "10px 0 0 0" }}>
            <strong style={{ fontWeight: "bold" }}>RUC:</strong> 20101087647
          </p>
          <p style={{ margin: "10px 0 0 0" }}>
            <strong style={{ fontWeight: "bold" }}>Dirección fiscal:</strong> Calle Camino Real 1801, Mz. B lote
            A4, Parque Industrial San Pedrito, Santiago de Surco
          </p>
        </div>
        
        {/* 3. CONTENEDOR PRINCIPAL DEL FORMULARIO Y BOTÓN DE ENVÍO */}
        {/* El evento onSubmit maneja la lógica de envío para TODOS los formularios */}
        <form onSubmit={handleSubmit}>
            
            {/* Formulario 1: Identificación */}
            <div style={{ width: "100%", marginLeft: "-200px" }}>
                <IdentificacionConsumidorForm /> 
            </div>

            {/* Formulario 2: Bien Contratado */}
            <div style={{ width: "100%", marginLeft: "-200px" }}>
                <DescripcionReclamoForm /> 
            </div>

           
            
            {/* BOTÓN DE ENVÍO ÚNICO */}
            <div className="flex justify-center mt-10 mb-5">
                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                    Enviar Reclamo
                </button>
            </div>
        </form>
        
      </div>
    </div>
  );
};

export default Reclamaciones;