import React, { useState, useEffect } from 'react';
import { categoriesService } from '../../services/api.js';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch, FaTimes } from 'react-icons/fa';

const CategoriesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesService.getAll();
        setData(res.data);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };
    fetchCategories();
  }, []);

  const filteredData = data.filter(item =>
    item.nom_cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleDelete = async (category) => {
    if (window.confirm(`¿Deseas eliminar la categoría "${category.nom_cat}"?`)) {
      try {
        await categoriesService.delete(category.id_cat);
        setData(data.filter(item => item.id_cat !== category.id_cat));
      } catch (err) {
        console.error('Error al eliminar categoría:', err);
      }
    }
  };

  const handleUpdateCategory = async (category) => {
  try {
    const formData = new FormData();
    formData.append('nom_cat', category.nom_cat);
    if (category.newImage) formData.append('imagen_cat', category.newImage);

    await categoriesService.update(category.id_cat, formData);

    // Cerrar modal
    setEditModalOpen(false);

    // Refrescar la lista desde el backend
    const res = await categoriesService.getAll();
    setData(res.data);

  } catch (err) {
    console.error('Error al actualizar categoría:', err);
  }
};



  return (
    <div className="space-y-4 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Categorías</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Buscador */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="text-sm text-gray-600">Lista de categorías</div>
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
                <tr key={item.id_cat} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id_cat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nom_cat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img 
                      src={`http://localhost:3000/${item.imagen_cat}`} 
                      alt={item.nom_cat}
                      className="w-24 h-24 object-cover rounded-lg"
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
            Mostrando {indexOfFirstEntry + 1} a {Math.min(indexOfLastEntry, filteredData.length)} de {filteredData.length} categorías
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
      {editModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="bg-white w-96 h-full p-6 overflow-auto relative">
            <button 
              onClick={() => setEditModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Editar Categoría</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={selectedCategory.nom_cat}
                onChange={(e) => setSelectedCategory({ ...selectedCategory, nom_cat: e.target.value })}
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
                      setSelectedCategory({ ...selectedCategory, newImage: file, imagenPreview: URL.createObjectURL(file) });
                    }
                  }}
                />
                {/* Previsualización */}
                <img 
                  src={selectedCategory.imagenPreview ? selectedCategory.imagenPreview : `http://localhost:3000/${selectedCategory.imagen_cat}`} 
                  alt={selectedCategory.nom_cat} 
                  className="w-40 h-40 object-cover rounded-lg mt-2"
                />
              </div>

              <button 
                onClick={() => handleUpdateCategory(selectedCategory)} 
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

export default CategoriesTable;
