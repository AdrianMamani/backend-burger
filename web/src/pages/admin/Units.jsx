import React, { useState, useEffect } from 'react';
import { unitsService } from '../../services/api.js';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch, FaTimes } from 'react-icons/fa';

const UnitsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const fetchUnits = async () => {
    try {
      const res = await unitsService.getAll();
      setData(res.data);
    } catch (err) {
      console.error('Error al obtener unidades:', err);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const filteredData = data.filter(item =>
    item.nom_uni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setEditModalOpen(true);
  };

  const handleDelete = async (unit) => {
    if (window.confirm(`¿Deseas eliminar la unidad "${unit.nom_uni}"?`)) {
      try {
        await unitsService.delete(unit.id_uni);
        setData(data.filter(item => item.id_uni !== unit.id_uni));
      } catch (err) {
        console.error('Error al eliminar unidad:', err);
      }
    }
  };

  const handleUpdateUnit = async (unit) => {
    try {
      await unitsService.update(unit.id_uni, { nom_uni: unit.nom_uni });
      setEditModalOpen(false);
      fetchUnits(); // refresca automáticamente
    } catch (err) {
      console.error('Error al actualizar unidad:', err);
    }
  };

  return (
    <div className="space-y-4 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Unidades</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Buscador */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="text-sm text-gray-600">Lista de unidades</div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((item, index) => (
                <tr key={item.id_uni} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id_uni}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nom_uni}</td>
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
            Mostrando {indexOfFirstEntry + 1} a {Math.min(indexOfLastEntry, filteredData.length)} de {filteredData.length} unidades
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
      {editModalOpen && selectedUnit && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="bg-white w-96 h-full p-6 overflow-auto relative">
            <button 
              onClick={() => setEditModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Editar Unidad</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={selectedUnit.nom_uni}
                onChange={(e) => setSelectedUnit({ ...selectedUnit, nom_uni: e.target.value })}
                className="border border-gray-300 rounded-lg p-2"
              />

              <button 
                onClick={() => handleUpdateUnit(selectedUnit)} 
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

export default UnitsTable;
