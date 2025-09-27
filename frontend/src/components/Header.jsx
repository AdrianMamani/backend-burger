import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, Truck } from "lucide-react";
import { categoriesService } from '../services/api';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <header className="bg-white text-gray-800 sticky top-0 z-50 shadow-sm">
        {/* Primera fila: Logo, búsqueda y navegación */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img src="/images/logo.png" alt="Logo" className="h-12" />
              </Link>

              {/* Barra de búsqueda - Centro */}
              <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-base"
                  />
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Navegación superior derecha */}
              <div className="hidden lg:flex items-center space-x-6">

                {/* Mis pedidos */}
                <Link to="/reclamaciones" className="flex items-center text-sm text-gray-600">
                  <ShoppingBag size={18} className="mr-2" />
                  <span>Libro de Reclamaciones</span>
                </Link>

                {/* Inicia sesión */}
                <Link to="/login" className="flex items-center text-sm text-gray-600">
                  <User size={18} className="mr-2" />
                  <span>Inicia sesión</span>
                </Link>
              </div>

              {/* Botón de menú móvil */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800 focus:outline-none p-2"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda fila: Categorías horizontales */}
<div className="bg-white border-b border-gray-200">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center py-3 overflow-x-auto">
      {loading ? (
        <div className="text-gray-600 text-sm">Cargando categorías...</div>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <Link
            key={category.id_cat} // usa el id real de tu API
            to={`/categorias/${category.nom_cat?.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-green-600 font-bold text-lg whitespace-nowrap mr-6 hover:text-green-800 transition-colors duration-200"
          >
            {category.nom_cat}
          </Link>
        ))
      ) : (
        <div className="text-gray-600 text-sm">No hay categorías disponibles</div>
      )}
    </div>
  </div>
</div>


        {/* Barra de búsqueda móvil */}
        <div className="lg:hidden border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Menú desplegable móvil */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Tipo de entrega */}
            <div className="flex items-center text-sm text-gray-600 border-b pb-3">
              <Truck size={16} className="mr-2" />
              <span>Tipo de entrega</span>
            </div>

            {/* Mis pedidos */}
            <Link 
              to="/mis-pedidos" 
              className="flex items-center text-sm text-gray-600 border-b pb-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag size={16} className="mr-2" />
              <span>Mis pedidos</span>
            </Link>

            {/* Inicia sesión */}
            <Link 
              to="/login" 
              className="flex items-center text-sm text-gray-600 border-b pb-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={16} className="mr-2" />
              <span>Inicia sesión</span>
            </Link>

            {/* Categorías móvil */}
            <div className="pt-2">
              <div className="grid grid-cols-2 gap-2">
                {loading ? (
                  <div className="col-span-2 text-center text-gray-600 text-sm">Cargando...</div>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category.id_cat}
                      to={`/categorias/${category.nom_cat?.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs text-gray-600 hover:text-green-600 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.nom_cat}
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-600 text-sm">No hay categorías</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
