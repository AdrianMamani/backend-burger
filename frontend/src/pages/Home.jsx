import React, { useEffect, useState } from "react";
import CategoriaCard from "../components/web/CategoriaCard.jsx";
import BrasasMenu from "../components/web/ProductosCard.jsx";
import MarcasSlot from "../components/web/MarcasSlot.jsx";
import { categoriesService, productsService } from "../services/api.js";

const Home = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    categoriesService
      .getAll()
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Error al obtener categorías", err));
  }, []);
  
  useEffect(() => {
    productsService
      .getAll()
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  return (
    <div className="w-full bg-gray-100">
      {/* Banner */}
      <div className="w-full">
        <img
          src="/images/banner1.webp"
          alt="Banner"
          className="w-full h-auto"
        />
      </div>

      {/* --- Sección de Productos --- */}
      <BrasasMenu />
      {/* --- Sección de Marcas al final --- */}
      <MarcasSlot />
    </div>
  );
};

export default Home;
