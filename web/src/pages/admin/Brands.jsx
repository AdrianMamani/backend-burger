import React, { useState, useEffect } from 'react';
import { brandsService } from '../../services/api.js';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch, FaTimes } from 'react-icons/fa';

const BrandsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Cargar marcas
  const fetchBrands = async () => {
    try {
      const res = await brandsService.getAll();
      setData(res.data);
    } catch (err) {
      console.error('Error al obtener marcas:', err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const filteredData = data.filter(item =>
    item.nom_marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setEditModalOpen(true);
  };

  const handleDelete = async (brand) => {
    if (window.confirm(`¿Deseas eliminar la marca "${brand.nom_marca}"?`)) {
      try {
        await brandsService.delete(brand.id_marca);
        setData(data.filter(item => item.id_marca !== brand.id_marca));
      } catch (err) {
        console.error('Error al eliminar marca:', err);
      }
    }
  };

  const handleUpdateBrand = async (brand) => {
  try {
    const formData = new FormData();
    formData.append('nom_marca', brand.nom_marca);
    if (brand.newImage) formData.append('imagen_marca', brand.newImage);

    await brandsService.update(brand.id_marca, formData);

    setEditModalOpen(false);

    // Refrescar lista automáticamente
    fetchBrands();
  } catch (err) {
    console.error('Error al actualizar marca:', err);
  }
};


  return (
    <div className="space-y-4 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Marcas</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Buscador */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="text-sm text-gray-600">Lista de marcas</div>
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 h-12 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((item, index) => (
                <tr key={item.id_marca} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id_marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nom_marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img 
  src={`http://localhost:3000/${item.imagen_marca}`} 
  alt={item.nom_marca}
  className="w-24 h-24 object-contain rounded-lg"
/>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(item)} className="p-2 rounded hover:bg-gray-200" title="Editar">
                        <FaEdit className="text-blue-500" size={16} />
                      </button>
                      <button onClick={() => handleDelete(item)} className="p-2 rounded hover:bg-red-100" title="Eliminar">
                        <FaTrash className="text-red-500" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            Mostrando {indexOfFirstEntry + 1} a {Math.min(indexOfLastEntry, filteredData.length)} de {filteredData.length} marcas
          </div>
          <div className="flex items-center space-x-1">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}>
              <FaChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)} className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{i + 1}</button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}>
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {editModalOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="bg-white w-96 h-full p-6 overflow-auto relative">
            <button 
              onClick={() => setEditModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Editar Marca</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={selectedBrand.nom_marca}
                onChange={(e) => setSelectedBrand({ ...selectedBrand, nom_marca: e.target.value })}
                className="border border-gray-300 rounded-lg p-2"
              />

              {/* Input para seleccionar imagen */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Imagen:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setSelectedBrand({ ...selectedBrand, newImage: file, imagenPreview: URL.createObjectURL(file) });
                    }
                  }}
                />
                {/* Previsualización */}
                <img 
  src={selectedBrand.imagenPreview ? selectedBrand.imagenPreview : `http://localhost:3000/${selectedBrand.imagen_marca}`} 
  alt={selectedBrand.nom_marca} 
  className="w-40 h-40 object-contain rounded-lg mt-2"
/>

              </div>

              <button 
                onClick={() => handleUpdateBrand(selectedBrand)} 
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsTable;
