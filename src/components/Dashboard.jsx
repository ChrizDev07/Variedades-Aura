import { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient.js";
import { TrendingUp, AlertCircle, Award, Calendar, DollarSign, Users, Clock, Crown, Star, Zap, Shield } from 'lucide-react';

export default function Dashboard() {
  const [deudores, setDeudores] = useState([]);
  const [mejoresClientes, setMejoresClientes] = useState([]);
  const [resumen, setResumen] = useState({ ingresos: 0, porCobrar: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Obtener deudores (Ventas con saldo pendiente ordenadas por fecha antigua)
      const { data: deudas } = await supabase
        .from('ventas')
        .select('*, clientes(nombre)')
        .neq('estado', 'Pagado')
        .order('created_at', { ascending: true });

      // 2. Obtener mejores pagadores (Top 5 por puntos)
      const { data: tops } = await supabase
        .from('clientes')
        .select('*')
        .order('puntos', { ascending: false })
        .limit(5);

      if (deudas) {
        setDeudores(deudas);
        const pendiente = deudas.reduce((acc, v) => acc + (v.total - v.abono), 0);
        setResumen(prev => ({ ...prev, porCobrar: pendiente }));
      }
      if (tops) setMejoresClientes(tops);
    };

    fetchStats();
  }, []);

  // Calcular estadísticas adicionales (solo visuales)
  const deudoresCount = deudores.length;
  const deudaPromedio = deudoresCount > 0 ? resumen.porCobrar / deudoresCount : 0;
  const clienteTop = mejoresClientes[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner de Bienvenida */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta! 👋</h1>
            <p className="text-purple-100">Panel de control de <strong>Variedades Aura Boutique</strong></p>
            <div className="mt-4 flex gap-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Zap size={14} /> Resumen del día
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Calendar size={14} /> {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
          <Shield size={80} className="text-white/20 hidden md:block" />
        </div>
      </div>

      {/* Tarjetas de Resumen Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total por Cobrar */}
        <div className="group bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-semibold uppercase tracking-wide">Total por Cobrar</p>
              <h3 className="text-3xl font-bold mt-2">${resumen.porCobrar.toLocaleString()}</h3>
              <p className="text-red-200 text-xs mt-2">{deudoresCount} clientes deben</p>
            </div>
            <div className="bg-white/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
              <AlertCircle size={32} />
            </div>
          </div>
        </div>

        {/* Deuda Promedio */}
        <div className="group bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide">Deuda Promedio</p>
              <h3 className="text-3xl font-bold mt-2">${deudaPromedio.toLocaleString()}</h3>
              <p className="text-orange-200 text-xs mt-2">Por cliente deudor</p>
            </div>
            <div className="bg-white/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
              <DollarSign size={32} />
            </div>
          </div>
        </div>

        {/* Clientes Morosos */}
        <div className="group bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-semibold uppercase tracking-wide">Clientes Morosos</p>
              <h3 className="text-3xl font-bold mt-2">{deudoresCount}</h3>
              <p className="text-yellow-200 text-xs mt-2">Con saldo pendiente</p>
            </div>
            <div className="bg-white/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
              <Users size={32} />
            </div>
          </div>
        </div>

        {/* Mejor Cliente */}
        <div className="group bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wide">Mejor Cliente</p>
              <h3 className="text-xl font-bold mt-2 truncate">{clienteTop?.nombre || 'Sin datos'}</h3>
              <p className="text-emerald-200 text-xs mt-2">{clienteTop?.puntos || 0} puntos acumulados</p>
            </div>
            <div className="bg-white/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
              <Crown size={32} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Tabla de Deudores Más Antiguos */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="text-white" size={22} /> 
              Deudores más antiguos
              <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">{deudores.length} clientes</span>
            </h3>
          </div>
          
          <div className="p-5 max-h-96 overflow-y-auto">
            {deudores.length > 0 ? (
              <div className="space-y-3">
                {deudores.map((d, index) => (
                  <div 
                    key={d.id} 
                    className="group flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{d.clientes?.nombre || 'Cliente eliminado'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={12} className="text-gray-400" />
                          <p className="text-xs text-gray-500">
                            Venta: {new Date(d.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-bold text-lg">-${(d.total - d.abono).toLocaleString()}</p>
                      <span className="inline-block text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full uppercase font-bold">
                        {d.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle size={32} className="text-green-600" />
                </div>
                <p className="text-gray-500 font-medium">¡No hay deudores!</p>
                <p className="text-sm text-gray-400 mt-1">Todos los clientes están al día</p>
              </div>
            )}
          </div>
        </div>

        {/* Ranking de Puntos */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="text-white" size={22} /> 
              Ranking de Pagadores (Puntos)
              <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">Top 5</span>
            </h3>
          </div>
          
          <div className="p-5 max-h-96 overflow-y-auto">
            {mejoresClientes.length > 0 ? (
              <div className="space-y-3">
                {mejoresClientes.map((c, index) => (
                  <div 
                    key={c.id} 
                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' : 'bg-gray-50'
                    } hover:shadow-md`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg' :
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                      index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg">{c.nombre}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <p className="text-sm text-gray-600">{c.puntos || 0} puntos acumulados</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <TrendingUp size={24} className={`${
                        index === 0 ? 'text-green-500' : 'text-gray-400'
                      } group-hover:scale-110 transition-transform`} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">Sin datos de clientes</p>
                <p className="text-sm text-gray-400 mt-1">Registra clientes para ver el ranking</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer del Dashboard */}
      <div className="text-center text-gray-400 text-sm pt-4">
        <p className="flex items-center justify-center gap-2">
          <TrendingUp size={14} /> Datos actualizados en tiempo real • Variedades Aura Boutique
        </p>
      </div>
    </div>
  );
}