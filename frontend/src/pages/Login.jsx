import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api.js";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ nombre: "", contrasena: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login({
        username: credentials.nombre,
        password: credentials.contrasena,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Credenciales incorrectas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Contenedor principal ultra-compacto */}
      <div className="flex flex-col items-center">
        {/* Logo muy grande y sin margen */}
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-64 w-64 object-contain"
        />

        {/* Formulario pegado al logo */}
        <form className="w-full max-w-sm flex flex-col gap-1 mt-1" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          {/* Nombre */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={credentials.nombre}
              onChange={handleChange}
              className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="contrasena"
              placeholder="Contraseña"
              value={credentials.contrasena}
              onChange={handleChange}
              className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Botón ingresar */}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition text-sm"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
