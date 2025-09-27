import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsService, categoriesService } from "../services/api.js";
import { motion, AnimatePresence } from "framer-motion";

const ProductosPage = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoriaData, setCategoriaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Traer productos
    productsService
      .getAll()
      .then((res) => {
        const filtrados = res.data.filter(
          (prod) =>
            prod.categoria.toLowerCase() ===
            categoria.replace(/-/g, " ").toLowerCase()
        );
        setProductos(filtrados);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener productos", err);
        setLoading(false);
      });

    // Traer categoría
    categoriesService
      .getAll()
      .then((res) => {
        const encontrada = res.data.find(
          (cat) =>
            cat.nom_cat.toLowerCase() ===
            categoria.replace(/-/g, " ").toLowerCase()
        );
        setCategoriaData(encontrada);
      })
      .catch((err) => console.error("Error al obtener categoría", err));
  }, [categoria]);

  if (loading) return <p className="text-center py-10">Cargando productos...</p>;
  if (!productos.length)
    return (
      <p className="text-center py-10 text-gray-600">
        No hay productos en esta categoría
      </p>
    );

  return (
    <div
      className="py-10 px-4 md:px-6 lg:px-40 bg-gray-100"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Tarjeta 1: Banner categoría */}
      <div className="bg-white rounded-2xl mb-10 relative">
        <div className="w-full h-24 md:h-32 flex relative">
          {/* Banner amarillo */}
          <div className="w-2/3 bg-yellow-400 relative"></div>

          {/* Nombre categoría */}
          <div className="w-1/3 bg-white flex flex-col justify-center items-center">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 uppercase text-center">
              {categoria.replace(/-/g, " ")}
            </h2>
          </div>

          {/* Imagen categoría sobrepuesta */}
          {categoriaData?.imagen_cat && (
            <img
              src={`http://localhost:3000/${categoriaData.imagen_cat}`}
              alt={categoriaData.nom_cat}
              className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 md:h-56 object-contain"
            />
          )}
        </div>
      </div>

      {/* Tarjeta 2: Productos */}
      <div className="bg-white rounded-2xl p-6">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {productos.map((prod) => (
              <motion.div
                key={prod.id_pro}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex rounded-xl overflow-hidden bg-white h-52"
              >
                {/* Imagen izquierda */}
                <div className="flex-shrink-0 w-48 h-full">
                  <img
                    src={`http://localhost:3000/${prod.imagen_pro}`}
                    alt={prod.nom_pro}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info derecha */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2">{prod.nom_pro}</h3>
                    <p className="text-sm text-gray-700">
                      {prod.descripcion_pro}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold text-gray-800">
                      S/ {prod.pre_pro}
                    </span>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-md transition duration-150">
                      Agregar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductosPage;
