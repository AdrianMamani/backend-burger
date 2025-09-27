// AdminSidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Tag, ShoppingBag, Store, Wrench, Bell, Settings, Search as SearchIcon } from 'lucide-react';
import { authService } from "../services/api.js";

const navLinks = [
  { to: "/admin/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { to: "/admin/categories", name: "Categorías", icon: <Tag size={20} /> },
  { to: "/admin/products", name: "Productos", icon: <ShoppingBag size={20} /> },
  { to: "/admin/brands", name: "Marcas", icon: <Store size={20} /> },
  { to: "/admin/units", name: "Unidades", icon: <Wrench size={20} /> },
];

const AdminSidebar = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    // Buscar coincidencias en navLinks
    const foundLink = navLinks.find(link =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundLink) {
      navigate(foundLink.to);
      setSearchTerm(""); // limpiar input
    }
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-gray-300 p-6 flex flex-col justify-between shadow-2xl z-50">
      <div>
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.31L19.53 7l-7.53 3.69L4.47 7 12 4.31zM4 9.17l7 3.5v6.5l-7-3.5V9.17zm9 10.83V12.67l7-3.5v6.5l-7 3.5z"/>
            </svg>
          </span>
          <h2 className="text-2xl font-bold text-white">Panel Admin</h2>
        </div>

        {/* Search dentro del sidebar */}
        <form onSubmit={handleSearch} className="flex mb-6 w-full">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 rounded-l-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
          />
          <button
            type="submit"
            className="bg-green-500 px-3 py-2 rounded-r-lg flex items-center justify-center hover:bg-green-600"
          >
            <SearchIcon size={18} />
          </button>
        </form>

        {/* Navegación */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
                }`
              }
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer del sidebar */}
      <div className="flex flex-col gap-2 border-t border-gray-700 pt-4">
        {/* Notificaciones */}
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-800">
          <Bell size={20} />
          <span className="font-medium">Notificaciones</span>
        </a>

        {/* Configuración */}
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-800">
          <Settings size={20} />
          <span className="font-medium">Configuración</span>
        </a>

        {/* Usuario */}
        {user && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-white font-medium">{user.nombre}</p>
            <p className="text-gray-400 text-sm">{user.correo}</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
