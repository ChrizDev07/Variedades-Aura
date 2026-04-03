import { useState, useEffect } from 'react';
import { supabase } from "../supabaseClient.js";
import { UserPlus, Users, Phone, Award, Sparkles, Crown, TrendingUp, Search, Filter } from 'lucide-react';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [tel, setTel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchClientes(); }, []);

  const fetchClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nombre');

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      console.error("🔥 Error real:", error.message);
      return;
    }

    if (data) setClientes(data);
  };

  const agregar = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('clientes')
      .insert([{ nombre, telefono: tel }]);

    if (error) {
      console.error("🔥 Error insert:", error.message);
      return;
    }

    setNombre('');
    setTel('');
    fetchClientes();
  };

  // Filtrar clientes por búsqueda (solo visual, no afecta lógica)
  const filteredClientes = clientes.filter(c => 
    c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefono?.includes(searchTerm)
  );

  // Calcular estadísticas (solo visual)
  const totalClientes = clientes.length;
  const totalPuntos = clientes.reduce((sum, c) => sum + (c.puntos || 0), 0);
  const topCliente = clientes.reduce((max, c) => (c.puntos || 0) > (max?.puntos || 0) ? c : max, null);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">Total Clientes</p>
              <p className="text-4xl font-bold mt-2">{totalClientes}</p>
            </div>
            <Users size={48} className="text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Puntos Totales</p>
              <p className="text-4xl font-bold mt-2">{totalPuntos}</p>
            </div>
            <Award size={48} className="text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wide">Mejor Cliente</p>
              <p className="text-lg font-bold mt-2 truncate">{topCliente?.nombre || 'Sin datos'}</p>
              <p className="text-sm mt-1">{topCliente?.puntos || 0} puntos</p>
            </div>
            <Crown size={48} className="text-white/30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Formulario de Registro */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <UserPlus className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Nuevo Cliente</h2>
              <p className="text-sm text-gray-500">Registra un cliente en el sistema</p>
            </div>
          </div>

          <form onSubmit={agregar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Ej: María González"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp / Teléfono
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Ej: 3001234567"
                value={tel}
                onChange={e => setTel(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="btn-primary w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles size={18} className="inline mr-2" />
              Registrar Cliente
            </button>
          </form>
        </div>

        {/* Lista de Clientes */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Directorio de Clientes</h2>
                <p className="text-sm text-gray-500">{clientes.length} clientes registrados</p>
              </div>
            </div>
            
            {/* Barra de búsqueda */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar cliente..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
            {filteredClientes.length > 0 ? (
              filteredClientes.map(c => (
                <div 
                  key={c.id} 
                  className="group p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {c.nombre?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <p className="font-bold text-gray-800 text-lg">{c.nombre}</p>
                      </div>
                      {c.telefono && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-2 ml-10">
                          <Phone size={14} /> {c.telefono}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1.5 shadow-md">
                        <span className="text-white font-bold text-sm flex items-center gap-1">
                          <Award size={14} /> {c.puntos || 0} pts
                        </span>
                      </div>
                      {c.puntos >= 100 && (
                        <div className="mt-2 text-xs text-purple-600 font-semibold">
                          <TrendingUp size={12} className="inline mr-1" />
                          Cliente Premium
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <Users size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No se encontraron clientes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}