import React, { useEffect, useState } from 'react';
import { brandsService } from '../../services/api.js';

const MarcasSlot = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    brandsService
      .getAll()
      .then((res) => setMarcas(res.data))
      .catch((err) => console.error('Error al cargar marcas:', err));
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          MARCAS ALIADAS
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
          {marcas.map((marca) => (
            <div key={marca.id_marca} className="flex items-center justify-center w-32 h-32">
  <img 
    src={`http://localhost:3000/${marca.imagen_marca}`} 
    alt={`Marca ${marca.id_marca}`}
    className="w-28 h-28 object-contain rounded-full"
  />
</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarcasSlot;
