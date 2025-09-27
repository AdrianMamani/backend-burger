import React from "react";

const CategoriaCard = ({ id, nombre, imagen }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col items-center cursor-pointer">
      <img
        src={imagen}
        alt={nombre}
        className="w-24 h-24 object-cover mb-3 rounded"
      />
      <h3 className="text-lg font-semibold">{nombre}</h3>
      <span className="text-gray-500 text-sm">ID: {id}</span>
    </div>
  );
};

export default CategoriaCard;
