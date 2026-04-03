import { useState, useEffect } from 'react';
import { supabase } from "../supabaseClient.js";
import { MinusCircle, Save, Trash2, TrendingDown, Clock, Filter, DollarSign, Calendar, Package, Truck, Home, MoreHorizontal } from 'lucide-react';

export default function Egresos() {
  const [egreso, setEgreso] = useState({ descripcion: '', monto: '', categoria: 'Insumos' });
  const [egresosList, setEgresosList] = useState([]);
  const [filterCategoria, setFilterCategoria] = useState('todos');
  const [totalEgresos, setTotalEgresos] = useState(0);

  useEffect(() => {
    fetchEgresos();
  }, []);

  const fetchEgresos = async () => {
    const { data, error } = await supabase
      .from('egresos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEgresosList(data);
      const total = data.reduce((sum, e) => sum + (parseFloat(e.monto) || 0), 0);
      setTotalEgresos(total);
    }
  };

  const guardarEgreso = async (e) => {
    e.preventDefault();
    if (!egreso.descripcion || !egreso.monto) return alert("Completa los campos");

    const { error } = await supabase.from('egresos').insert([egreso]);
    if (!error) {
      alert("Gasto registrado");
      setEgreso({ descripcion: '', monto: '', categoria: 'Insumos' });
      fetchEgresos();
    }
  };

  const eliminarEgreso = async (id) => {
    if (confirm('¿Eliminar este gasto?')) {
      const { error } = await supabase.from('egresos').delete().eq('id', id);
      if (!error) {
        alert('Gasto eliminado');
        fetchEgresos();
      }
    }
  };

  // Filtrar egresos (solo visual)
  const filteredEgresos = filterCategoria === 'todos' 
    ? egresosList 
    : egresosList.filter(e => e.categoria === filterCategoria);

  // Iconos por categoría
  const getCategoriaIcon = (categoria) => {
    switch(categoria) {
      case 'Insumos': return <Package size={16} />;
      case 'Servicios': return <Home size={16} />;
      case 'Transporte': return <Truck size={16} />;
      default: return <MoreHorizontal size={16} />;
    }
  };

  const getCategoriaColor = (categoria) => {
    switch(categoria) {
      case 'Insumos': return 'bg-purple-100 text-purple-700';
      case 'Servicios': return 'bg-blue-100 text-blue-700';
      case 'Transporte': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-semibold uppercase tracking-wide">Total Gastos</p>
              <p className="text-3xl font-bold mt-2">${totalEgresos.toLocaleString()}</p>
            </div>
            <TrendingDown size={48} className="text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide">Total Gastos Hoy</p>
              <p className="text-3xl font-bold mt-2">
                ${egresosList.filter(e => {
                  const hoy = new Date().toDateString();
                  const fechaEgreso = new Date(e.created_at).toDateString();
                  return fechaEgreso === hoy;
                }).reduce((sum, e) => sum + (parseFloat(e.monto) || 0), 0).toLocaleString()}
              </p>
            </div>
            <Calendar size={48} className="text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-semibold uppercase tracking-wide">Total Transacciones</p>
              <p className="text-3xl font-bold mt-2">{egresosList.length}</p>
            </div>
            <Clock size={48} className="text-white/30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Formulario de Registro */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
              <MinusCircle className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Registrar Gasto</h2>
              <p className="text-sm text-gray-500">Control de egresos y gastos</p>
            </div>
          </div>

          <form onSubmit={guardarEgreso} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción *
              </label>
              <input 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="Ej: Compra de catalogo, pago de servicios, etc."
                value={egreso.descripcion}
                onChange={(e) => setEgreso({...egreso, descripcion: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monto ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="0.00"
                  value={egreso.monto}
                  onChange={(e) => setEgreso({...egreso, monto: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoría
              </label>
              <select 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white"
                value={egreso.categoria}
                onChange={(e) => setEgreso({...egreso, categoria: e.target.value})}
              >
                <option value="Insumos">📦 Compra de Productos</option>
                <option value="Servicios">🏠 Servicios / Local</option>
                <option value="Transporte">🚚 Transporte / Fletes</option>
                <option value="Otros">📋 Otros</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Save size={20}/> 
              Guardar Egreso
            </button>
          </form>
        </div>

        {/* Lista de Gastos */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trash2 size={20} /> 
                Historial de Gastos
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">{egresosList.length} registros</span>
              </h3>
              
              {/* Filtro por categoría */}
              <div className="relative">
                <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select 
                  className="pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white text-sm border border-white/30 focus:outline-none"
                  value={filterCategoria}
                  onChange={(e) => setFilterCategoria(e.target.value)}
                >
                  <option value="todos" className="text-gray-800">Todas las categorías</option>
                  <option value="Insumos" className="text-gray-800">📦 Insumos</option>
                  <option value="Servicios" className="text-gray-800">🏠 Servicios</option>
                  <option value="Transporte" className="text-gray-800">🚚 Transporte</option>
                  <option value="Otros" className="text-gray-800">📋 Otros</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-5 max-h-96 overflow-y-auto">
            {filteredEgresos.length > 0 ? (
              <div className="space-y-3">
                {filteredEgresos.map((e, index) => (
                  <div 
                    key={e.id} 
                    className="group flex justify-between items-start p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getCategoriaColor(e.categoria)}`}>
                          {getCategoriaIcon(e.categoria)} {e.categoria}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {new Date(e.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800">{e.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-bold text-lg">-${(parseFloat(e.monto) || 0).toLocaleString()}</p>
                      <button 
                        onClick={() => eliminarEgreso(e.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors mt-1 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MinusCircle size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No hay gastos registrados</p>
                <p className="text-sm text-gray-400 mt-1">Comienza registrando un egreso</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}