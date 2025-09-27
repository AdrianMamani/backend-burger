import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Products from "./pages/admin/Products.jsx";
import Brands from "./pages/admin/Brands.jsx";
import Units from "./pages/admin/Units.jsx";

// 👇 importa tu Reclamaciones
import Reclamaciones from "./pages/Reclamaciones.jsx";

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/reclamaciones" element={<Reclamaciones />} /> {/* 👈 Aquí */}
      </Route>
      
      {/* Login separado, sin Layout */}
      <Route path="/login" element={<Login />} />

      {/* Admin Pages */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/brands" element={<Brands />} />
        <Route path="/admin/units" element={<Units />} />
      </Route>
    </Routes>
  );
}

export default App;
