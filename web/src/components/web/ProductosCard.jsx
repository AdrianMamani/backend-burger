import React, { useEffect, useState } from 'react';
import { productsService } from '../../services/api.js';
import { motion, AnimatePresence } from 'framer-motion';

const BrasasMenu = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const [loading, setLoading] = useState(true);
  const [verMasCategorias, setVerMasCategorias] = useState({});

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

        const initialVerMas = {};
        Object.keys(grouped).forEach(cat => {
          initialVerMas[cat] = false;
        });
        setVerMasCategorias(initialVerMas);

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener productos', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Cargando productos...</p>;

  const toggleVerMas = (categoria) => {
    setVerMasCategorias(prev => ({
      ...prev,
      [categoria]: !prev[categoria]
    }));
  };

  return (
    <div className="py-10 px-4 md:px-6 lg:px-40" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Más separación entre tarjetas globales */}
      <div className="space-y-20">
        {Object.keys(productosPorCategoria).map((categoria) => {
          const productos = productosPorCategoria[categoria];
          const mostrarTodos = verMasCategorias[categoria];
          const productosAMostrar = mostrarTodos ? productos : productos.slice(0, 6);

          return (
            // Tarjeta global por categoría sin sombra
            <motion.div 
              key={categoria} 
              layout 
              className="bg-white rounded-2xl pt-12 px-12 pb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold uppercase mb-6">{categoria}</h2>

              <motion.div
                layout
                initial={{ borderRadius: 10 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {productosAMostrar.map((prod) => (
                    <motion.div
                      key={prod.id_pro}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex rounded-xl overflow-hidden h-52"
                    >
                      {/* Imagen a la izquierda, más grande */}
                      <div className="flex-shrink-0 w-48 h-full">
                        <img
                          src={`http://localhost:3000/${prod.imagen_pro}`}
                          alt={prod.nom_pro}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Información y botón */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold mb-2">{prod.nom_pro}</h3>
                          <p className="text-sm text-gray-700">{prod.descripcion_pro}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xl font-bold text-gray-800">S/ {prod.pre_pro}</span>
                          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-md transition duration-150">
                            Agregar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              {/* Boton en caso querer mostrar mas
              {productos.length > 6 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => toggleVerMas(categoria)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
                  >
                    {mostrarTodos ? 'Ver menos' : 'Ver más'}
                  </button>
                </div> 
              )} */}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BrasasMenu;
