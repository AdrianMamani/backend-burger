import React from 'react';

const IdentificacionConsumidorForm = () => {
  // Clases comunes para el estilo de los campos
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600 box-border transition duration-150 ease-in-out";
  const labelClasses = "block font-bold mb-1 text-gray-700";
  const requiredAsterisk = <span className="text-red-500">*</span>;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-200">
      
      {/* Encabezado Azul */}
      <div className="bg-blue-800 text-white p-3 sm:p-4 text-lg font-extrabold text-center">
        I. Identificación del Consumidor Reclamante:
      </div>

      <form className="p-5 sm:p-8">
        
        {/* Contenedor de Campos en Dos Columnas (Responsivo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          {/* Fila 1: Nombres y Apellidos */}
          <div>
            <label className={labelClasses}>Nombres:{requiredAsterisk}</label>
            <input type="text" className={inputClasses} placeholder="" />
          </div>
          <div>
            <label className={labelClasses}>Apellido:{requiredAsterisk}</label>
            <input type="text" className={inputClasses} placeholder="" />
          </div>

          {/* Fila 2: Tipo de Documento y N° Doc */}
          <div>
            <label className={labelClasses}>N° Doc:{requiredAsterisk}</label>
            <input type="text" className={inputClasses} placeholder="" />
          </div>

          {/* Fila 3: Teléfono y Email */}
          <div>
            <label className={labelClasses}>Teléfono:{requiredAsterisk}</label>
            <input type="tel" className={inputClasses} placeholder="" />
          </div>
          <div>
            <label className={labelClasses}>Email:{requiredAsterisk}</label>
            <input type="email" className={inputClasses} placeholder="" />
          </div>

          {/* Fila 4: Departamento y Provincia */}
          <div>
            <label className={labelClasses}>Departamento:{requiredAsterisk}</label>
            <select className={`${inputClasses} appearance-none`}>
              <option>Seleccione departamento</option>
              {/* Opciones aquí */}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Provincia:{requiredAsterisk}</label>
            <select className={`${inputClasses} appearance-none`}>
              <option>Seleccione provincia</option>
              {/* Opciones aquí */}
            </select>
          </div>

          {/* Fila 5: Distrito y Dirección */}
          <div>
            <label className={labelClasses}>Distrito:{requiredAsterisk}</label>
            <select className={`${inputClasses} appearance-none`}>
              <option>Seleccione distrito</option>
              {/* Opciones aquí */}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Dirección:{requiredAsterisk}</label>
            <input type="text" className={inputClasses} placeholder="" />
          </div>

          

        </div>
      </form>
    </div>
  );
};

export default IdentificacionConsumidorForm;