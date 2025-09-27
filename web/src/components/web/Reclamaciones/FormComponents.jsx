import React from "react";

// Formulario de Identificación
export const IdentificacionConsumidorForm = ({ formData, onChange, departamentos, provincias, distritos }) => {
  const baseInputClasses = "w-full p-3 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600 transition";
  const labelClasses = "block font-bold mb-1 text-gray-700";
  const requiredAsterisk = <span className="text-red-500">*</span>;
  const selectClasses = (enabled) => `${baseInputClasses} ${enabled ? "bg-white cursor-pointer" : "bg-gray-200 cursor-not-allowed"}`;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full border border-gray-200">
      <div className="bg-blue-800 text-white p-3 sm:p-4 text-lg font-extrabold text-center">
        I. Identificación del Consumidor Reclamante:
      </div>
      <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Nombres */}
        <div>
          <label className={labelClasses}>Nombres:{requiredAsterisk}</label>
          <input type="text" name="nombres" value={formData.nombres} onChange={onChange} className={baseInputClasses} required />
        </div>
        {/* Apellidos */}
        <div>
          <label className={labelClasses}>Apellidos:{requiredAsterisk}</label>
          <input type="text" name="apellidos" value={formData.apellidos} onChange={onChange} className={baseInputClasses} required />
        </div>
        {/* DNI */}
        <div>
          <label className={labelClasses}>N° Doc:{requiredAsterisk}</label>
          <input type="text" name="dni" value={formData.dni} onChange={onChange} className={baseInputClasses} required />
        </div>
        {/* Teléfono */}
        <div>
          <label className={labelClasses}>Teléfono:{requiredAsterisk}</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={onChange} className={baseInputClasses} required />
        </div>
        {/* Correo */}
        <div>
          <label className={labelClasses}>Email:{requiredAsterisk}</label>
          <input type="email" name="correo" value={formData.correo} onChange={onChange} className={baseInputClasses} required />
        </div>
        {/* Departamento */}
        <div>
          <label className={labelClasses}>Departamento:{requiredAsterisk}</label>
          <select
            name="departamento"
            value={formData.departamento}
            onChange={onChange}
            className={selectClasses(true)}
            required
          >
            <option value="">Seleccione departamento</option>
            {departamentos.map((d) => (
              <option key={d.id_departamento} value={String(d.id_departamento)}>{d.nombre}</option>
            ))}
          </select>
        </div>
        {/* Provincia */}
        <div>
          <label className={labelClasses}>Provincia:{requiredAsterisk}</label>
          <select
            name="provincia"
            value={formData.provincia}
            onChange={onChange}
            disabled={!formData.departamento || provincias.length === 0}
            className={selectClasses(!!formData.departamento && provincias.length > 0)}
            required
          >
            <option value="">Seleccione provincia</option>
            {provincias.map((p) => (
              <option key={p.id_provincia} value={String(p.id_provincia)}>{p.nombre}</option>
            ))}
          </select>
        </div>
        {/* Distrito */}
        <div>
          <label className={labelClasses}>Distrito:{requiredAsterisk}</label>
          <select
            name="distrito"
            value={formData.distrito}
            onChange={onChange}
            disabled={!formData.provincia || distritos.length === 0}
            className={selectClasses(!!formData.provincia && distritos.length > 0)}
            required
          >
            <option value="">Seleccione distrito</option>
            {distritos.map((d) => (
              <option key={d.id_distrito} value={String(d.id_distrito)}>{d.nombre || d.distrito}</option>
            ))}
          </select>
        </div>
        {/* Dirección */}
        <div>
          <label className={labelClasses}>Dirección:{requiredAsterisk}</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={onChange} className={baseInputClasses} required />
        </div>
      </div>
    </div>
  );
};

// Formulario de Descripción del Reclamo
export const DescripcionReclamoForm = ({ formData, onChange }) => {
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600 transition";
  const labelClasses = "block font-bold mb-2 text-gray-700";

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full border border-gray-200 mt-8">
      <div className="bg-blue-800 text-white p-3 sm:p-4 text-lg font-extrabold text-center">
        2. Detalles de la Reclamación:
      </div>
      <div className="p-5 sm:p-8">
        <div className="mb-4">
          <label className={labelClasses} htmlFor="descripcion">Descripción del Reclamo:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={onChange}
            className={`${inputClasses} h-40 resize-y`}
            placeholder="Especificar la descripción detallada del reclamo o queja..."
            maxLength="300"
            required
          />
          <p className="text-sm text-red-600 mt-1">Máximo permitido 600 caracteres</p>
        </div>
      </div>
    </div>
  );
};
