import { useState, useEffect } from 'react';
import { supabase, formatoCOP } from '../supabaseClient.js';
import { PackagePlus, List, Tag, Sparkles, Search, Filter, Grid3x3, TrendingUp, DollarSign, Box, Edit, Trash2 } from 'lucide-react';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', categoria: 'Propio' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('todos');
  const [viewMode, setViewMode] = useState('list'); // 'list' o 'grid'

  useEffect(() => { fetchProductos(); }, []);

  const fetchProductos = async () => {
    const { data } = await supabase.from('productos').select('*').order('created_at', { ascending: false });
    if (data) setProductos(data);
  };

  const guardar = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('productos').insert([form]);
    if (!error) {
      setForm({ nombre: '', precio: '', categoria: 'Propio' });
      fetchProductos();
    }
  };

  // Filtrar productos (solo visual)
  const filteredProductos = productos.filter(p => {
    const matchSearch = p.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = filterCategoria === 'todos' || p.categoria === filterCategoria;
    return matchSearch && matchCategoria;
  });

  // Estadísticas (solo visual)
  const totalProductos = productos.length;
  const totalValorInventario = productos.reduce((sum, p) => sum + (parseFloat(p.precio) || 0), 0);
  const productosPropios = productos.filter(p => p.categoria === 'Propio').length;
  const productosCatalogo = productos.filter(p => p.categoria === 'Catalogo').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs font-semibold uppercase tracking-wide">Total Productos</p>
              <p className="text-2xl font-bold mt-1">{totalProductos}</p>
            </div>
            <Box size={32} className="text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-5 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide">Valor Inventario</p>
              <p className="text-lg font-bold mt-1">{formatoCOP(totalValorInventario)}</p>
            </div>
            <DollarSign size={32} className="text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs font-semibold uppercase tracking-wide">Productos Propios</p>
              <p className="text-2xl font-bold mt-1">{productosPropios}</p>
            </div>
            <Tag size={32} className="text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs font-semibold uppercase tracking-wide">Catálogo Externo</p>
              <p className="text-2xl font-bold mt-1">{productosCatalogo}</p>
            </div>
            <TrendingUp size={32} className="text-white/30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Formulario de Registro */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 h-fit lg:sticky lg:top-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <PackagePlus className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Nuevo Artículo</h2>
              <p className="text-sm text-gray-500">Agrega productos al inventario</p>
            </div>
          </div>

          <form onSubmit={guardar} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del producto *
              </label>
              <input 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Ej: Loción Invictus, Zapatos Casual, etc."
                value={form.nombre} 
                onChange={e => setForm({...form, nombre: e.target.value})} 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Precio (COP) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="0"
                  value={form.precio} 
                  onChange={e => setForm({...form, precio: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoría
              </label>
              <select 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                value={form.categoria} 
                onChange={e => setForm({...form, categoria: e.target.value})}
              >
                <option value="Propio">🏪 Producto Propio</option>
                <option value="Catalogo">📚 Catálogo / Externo</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles size={18} /> 
              Guardar Producto
            </button>
          </form>
        </div>

        {/* Lista de Productos */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <List className="text-white" size={22} />
                <h3 className="text-lg font-bold text-white">Inventario Actual</h3>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{filteredProductos.length} productos</span>
              </div>
              
              <div className="flex gap-2">
                {/* Vista Lista/Grid */}
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/30 backdrop-blur-sm' : 'hover:bg-white/20'}`}
                >
                  <List size={18} className="text-white" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/30 backdrop-blur-sm' : 'hover:bg-white/20'}`}
                >
                  <Grid3x3 size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative sm:w-48">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={filterCategoria}
                  onChange={(e) => setFilterCategoria(e.target.value)}
                >
                  <option value="todos">Todas las categorías</option>
                  <option value="Propio">🏪 Productos Propios</option>
                  <option value="Catalogo">📚 Catálogo Externo</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-5 max-h-[500px] overflow-y-auto">
            {filteredProductos.length > 0 ? (
              viewMode === 'list' ? (
                // Vista de lista
                <div className="space-y-3">
                  {filteredProductos.map(p => (
                    <div 
                      key={p.id} 
                      className="group flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800 text-lg">{p.nombre}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            p.categoria === 'Propio' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {p.categoria === 'Propio' ? '🏪 Propio' : '📚 Catálogo'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {formatoCOP(p.precio)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                // Vista de cuadrícula
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProductos.map(p => (
                    <div 
                      key={p.id} 
                      className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Tag className="text-white" size={20} />
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          p.categoria === 'Propio' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {p.categoria === 'Propio' ? 'Propio' : 'Catálogo'}
                        </span>
                      </div>
                      <p className="font-bold text-gray-800 text-base mb-2 line-clamp-2">{p.nombre}</p>
                      <p className="text-lg font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {formatoCOP(p.precio)}
                      </p>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PackagePlus size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No hay productos registrados</p>
                <p className="text-sm text-gray-400 mt-1">Comienza agregando un producto</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}