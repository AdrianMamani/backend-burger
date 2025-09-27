import React, { useState, useEffect } from 'react';
import { FaBox, FaTags, FaTrademark, FaLayerGroup } from 'react-icons/fa';
import { productsService, categoriesService, brandsService, unitsService } from '../../services/api.js';
import CountUp from '../../components/utils/CountUp.jsx';

const Dashboard = () => {
  const [totales, setTotales] = useState({
    productos: 0,
    categorias: 0,
    marcas: 0,
    unidades: 0,
  });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const [productosRes, categoriasRes, marcasRes, unidadesRes] = await Promise.all([
          productsService.getAll(),
          categoriesService.getAll(),
          brandsService.getAll(),
          unitsService.getAll(),
        ]);

        setTotales({
          productos: productosRes.data.length,
          categorias: categoriasRes.data.length,
          marcas: marcasRes.data.length,
          unidades: unidadesRes.data.length,
        });
      } catch (err) {
        console.error('Error al obtener totales:', err);
      }
    };

    fetchTotals();
  }, []);

  const tarjetas = [
    { titulo: 'Productos', total: totales.productos, icon: <FaBox size={32} className="text-blue-500" /> },
    { titulo: 'Categorías', total: totales.categorias, icon: <FaTags size={32} className="text-green-500" /> },
    { titulo: 'Marcas', total: totales.marcas, icon: <FaTrademark size={32} className="text-red-500" /> },
    { titulo: 'Unidades', total: totales.unidades, icon: <FaLayerGroup size={32} className="text-yellow-500" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Título Dashboard */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h2>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.titulo} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
            {tarjeta.icon}
            <div>
              <div className="text-gray-500 text-sm">{tarjeta.titulo}</div>
              <CountUp
                from={0}
                to={tarjeta.total}
                separator=","
                direction="up"
                duration={1}
                className="text-2xl font-bold text-gray-800"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
