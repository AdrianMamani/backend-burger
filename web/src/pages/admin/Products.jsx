import React, { useState, useEffect } from 'react';
import { productsService } from '../../services/api.js';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsService.getAll();
        setData(res.data);
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };
    fetchProducts();
  }, []);

  const filteredData = data.filter(item =>
    item.nom_pro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descripcion_pro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (product) => console.log('Editar', product);
  const handleDelete = (product) => console.log('Eliminar', product);

  return (
    <div className="space-y-4">
      {/* Títulos fuera del contenedor de la tabla */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Productos</h2>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="text-sm text-gray-600">Lista de productos</div>
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 h-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((item, index) => (
                <tr key={item.id_pro} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id_pro}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nom_pro}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descripcion_pro}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.pre_pro}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stk_pro}</td>
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

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            Mostrando {indexOfFirstEntry + 1} a {Math.min(indexOfLastEntry, filteredData.length)} de {filteredData.length} productos
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
    </div>
  );
};

export default DataTable;
