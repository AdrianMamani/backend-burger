import React, { useState, useEffect } from "react";
import { getFechaActual } from "../components/utils/fecha.js"; 
import { reclamosService, departamentosService, provinciasService, distritosService } from "../services/api.js"; 
import { INITIAL_FORM_DATA } from "../components/web/Reclamaciones/formConstants.js";
import { IdentificacionConsumidorForm, DescripcionReclamoForm } from "../components/web/Reclamaciones/FormComponents.jsx";
import { FaPaperPlane } from "react-icons/fa";


const MENU_ITEMS = [
  "CENTRO DE AYUDA",
  "Términos y Condiciones",
  "Términos y Condiciones de Promociones",
  "Políticas de Datos Personales",
  "Libro de reclamaciones",
  "Derechos ARCO",
  "Zonas de Reparto",
];

const Reclamaciones = () => {
  const fechaHoy = typeof getFechaActual === 'function' ? getFechaActual() : new Date().toLocaleDateString('es-PE');
  
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => { departamentosService.getAll().then(res => setDepartamentos(res.data)).catch(console.error); }, []);
  useEffect(() => {
    if (!formData.departamento) { setProvincias([]); setDistritos([]); return; }
    provinciasService.getByDepartamento(formData.departamento).then(res => setProvincias(res.data)).catch(console.error);
  }, [formData.departamento]);
  useEffect(() => {
    if (!formData.provincia) { setDistritos([]); return; }
    distritosService.getByProvincia(formData.provincia).then(res => setDistritos(res.data)).catch(console.error);
  }, [formData.provincia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newForm = { ...prev, [name]: value };
      if (name === "departamento") { newForm.provincia = ""; newForm.distrito = ""; }
      if (name === "provincia") { newForm.distrito = ""; }
      return newForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.distrito || !formData.descripcion) { alert("Seleccione distrito y complete la descripción del reclamo."); return; }

    try {
      const payload = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        dni: formData.dni,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correo: formData.correo,
        distrito: Number(formData.distrito),
        descripcion: formData.descripcion,
        fecha: new Date().toISOString().slice(0,19).replace("T"," "),
        estado: "Pendiente"
      };
      console.log("🔹 Payload a enviar a la API:", payload);
      const response = await reclamosService.createWithClient(payload);
      console.log("✅ Respuesta API:", response.data);
      alert("✅ Reclamo enviado con éxito.");
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error("❌ Error al enviar reclamo:", error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Ocurrió un error al registrar el reclamo.";
      alert(`❌ Error: ${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-10 py-10">
      
      {/* Menú lateral estático */}
      <div className="w-full md:w-1/4 mb-8 md:mb-0 pr-8">
        <h3 className="font-bold text-lg mb-4 text-left">CENTRO DE AYUDA</h3>
        <ul className="space-y-2 text-gray-700 text-left">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer px-2 py-1 rounded ${
                item === "Libro de reclamaciones" ? "font-bold text-blue-600" : "hover:text-blue-600"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="w-full md:w-3/4 text-left">
        <h2 className="font-bold text-2xl mb-2">HOJA DE RECLAMACIÓN</h2>
        <p className="mb-4 text-sm text-gray-600">
          Conforme a lo establecido en el código de la Protección y Defensa del consumidor este establecimiento cuenta con un Libro de Reclamaciones a tu disposición. Registra la queja o reclamo aquí.
          Al presentar tu reclamo autoriza el tratamiento de sus datos personales.
        </p>

        <div className="text-base mb-4">
          <p><strong>Fecha:</strong> {fechaHoy}</p>
          <p><strong>Razón Social:</strong> BEMBOS S.A.C.</p>
          <p><strong>RUC:</strong> 20101087647</p>
          <p><strong>Dirección fiscal:</strong> Calle Camino Real 1801, Mz. B lote A4, Parque Industrial San Pedrito, Santiago de Surco</p>
        </div>

        <form onSubmit={handleSubmit}>
          <IdentificacionConsumidorForm formData={formData} onChange={handleChange} departamentos={departamentos} provincias={provincias} distritos={distritos} />
          <DescripcionReclamoForm formData={formData} onChange={handleChange} />
          <div className="flex justify-center mt-10 mb-5">
           <button
  type="submit"
  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition flex items-center gap-2"
>
  <FaPaperPlane />
  Enviar
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reclamaciones;
