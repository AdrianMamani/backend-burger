// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <AdminSidebar />
    {/* Main con margen izquierdo igual al ancho del sidebar */}
    <main className="flex-1 p-6 bg-gray-100 ml-64">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
