import React from 'react';

const DescripcionReclamoForm = () => {
  // Clases comunes para los campos
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600 box-border transition duration-150 ease-in-out";
  const labelClasses = "block font-bold mb-2 text-gray-700";
  const radioLabelClasses = "ml-2 text-gray-700 select-none";
  const radioInputClasses = "h-5 w-5 text-blue-800 border-gray-400 focus:ring-blue-600";

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-200 mt-8">
      
      {/* Encabezado Azul */}
      <div className="bg-blue-800 text-white p-3 sm:p-4 text-lg font-extrabold text-center">
        2. Detalles de la Reclamacion:
      </div>

      <form className="p-5 sm:p-8">
        
        {/* TIPO DE BIEN (PRODUCTO / SERVICIO) */}
        

      

        {/* DESCRIPCIÓN */}
        <div className="mb-4">
          <label className={labelClasses} htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            className={`${inputClasses} h-40 resize-y`} // h-40 da la altura visible en la imagen
            placeholder="Especificar la descripcion del reclamo"
            maxLength="300"
          ></textarea>
          <p className="text-sm text-red-600 mt-1">Máximo permitido 300 caracteres</p>
        </div>

      </form>
    </div>
  );
};

export default DescripcionReclamoForm;