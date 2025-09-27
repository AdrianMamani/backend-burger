import React, { useEffect, useState } from 'react';
import { productsService } from '../../services/api.js';

const BrasasMenu = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsService
      .getAll()
      .then((res) => {
        const grouped = res.data.reduce((acc, prod) => {
          const cat = prod.categoria;
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(prod);
          return acc;
        }, {});
        setProductosPorCategoria(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener productos', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Cargando productos...</p>;

  return (
    <div className="p-8 max-w-7xl mx-auto my-10 space-y-8">
      {Object.keys(productosPorCategoria).map((categoria) => (
        <div key={categoria} className="bg-white p-6 rounded-xl shadow-xl">
          {/* Nombre de la categoría */}
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-6">{categoria}</h2>

          {/* Grid de productos dentro del card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
            {productosPorCategoria[categoria].map((prod) => (
              <div
                key={prod.id_pro}
                className="flex flex-col md:flex-row items-start justify-start gap-4 p-4 rounded-lg"
              >
                {/* Imagen del producto */}
                <div className="relative flex-shrink-0">
                  <img
                    src={`http://localhost:3000/${prod.imagen_pro}`}
                    alt={prod.nom_pro}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  {/* Logo de la marca */}
                  {prod.marca && prod.imagen_marca && (
                    <div className="absolute bottom-0 right-0 w-8 h-8">
                      <img
                        src={`http://localhost:3000/${prod.imagen_marca}`}
                        alt={prod.marca}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {prod.nom_pro}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2 leading-tight">
                    {prod.descripcion_pro}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold text-gray-800">
                      S/ {prod.pre_pro}
                    </span>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-md text-sm transition duration-150 shadow-md whitespace-nowrap">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrasasMenu;
