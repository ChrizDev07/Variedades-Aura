import { useState, useEffect } from 'react';
import { supabase, formatoCOP, getFechaColombia } from "../supabaseClient.js";
import { ShoppingBag, User, CreditCard, DollarSign, Sparkles, CheckCircle, AlertCircle, Store, Package, TrendingUp, ArrowRight } from 'lucide-react';

export default function VentaModulo() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [venta, setVenta] = useState({ cliente_id: '', producto_id: '', abono: 0 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const resP = await supabase.from('productos').select('*');
      const resC = await supabase.from('clientes').select('*');
      setProductos(resP.data || []);
      setClientes(resC.data || []);
    };
    cargar();
  }, []);

  // Actualizar producto seleccionado (solo visual)
  useEffect(() => {
    const prod = productos.find(p => p.id === venta.producto_id);
    setSelectedProduct(prod);
  }, [venta.producto_id, productos]);

  // Actualizar cliente seleccionado (solo visual)
  useEffect(() => {
    const client = clientes.find(c => c.id === venta.cliente_id);
    setSelectedClient(client);
  }, [venta.cliente_id, clientes]);

  const registrar = async () => {
    const prod = productos.find(p => p.id === venta.producto_id);
    if (!prod || !venta.cliente_id) return alert("Por favor, selecciona un cliente y un producto.");

    const total = prod.precio;
    const { error } = await supabase.from('ventas').insert([{
      cliente_id: venta.cliente_id,
      total: total,
      abono: venta.abono,
      estado: (total - venta.abono) <= 0 ? 'Pagado' : 'Pendiente',
      created_at: getFechaColombia()
    }]);

    if (!error) {
      alert("¡Venta registrada con éxito en Variedades Aura!");
      setVenta({ cliente_id: '', producto_id: '', abono: 0 });
      setSelectedProduct(null);
      setSelectedClient(null);
    } else {
      console.error(error);
      alert("Hubo un error al registrar la venta.");
    }
  };

  // Calcular saldo restante (solo visual)
  const saldoRestante = selectedProduct ? selectedProduct.precio - venta.abono : 0;
  const isPagado = saldoRestante <= 0 && venta.abono > 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner de bienvenida */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Store className="text-white" />
              Punto de Venta
            </h2>
            <p className="text-blue-100">Registra ventas de calzado, ropa y lociones</p>
          </div>
          <Sparkles size={48} className="text-white/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Formulario Principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard size={22} />
              Nueva Venta / Cobro
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {/* SECCIÓN CLIENTE */}
            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-3">
                <User size={16} className="text-blue-600" />
                Seleccionar Cliente
              </label>
              <select 
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                value={venta.cliente_id}
                onChange={e => setVenta({...venta, cliente_id: e.target.value})}
              >
                <option value="">👤 ¿A quién le vendes?</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} {c.puntos ? `⭐ ${c.puntos} pts` : ''}
                  </option>
                ))}
              </select>
              
              {/* Info cliente seleccionado */}
              {selectedClient && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-gray-600">Cliente: <strong>{selectedClient.nombre}</strong></span>
                  {selectedClient.telefono && <span className="text-gray-400">| 📞 {selectedClient.telefono}</span>}
                </div>
              )}
            </div>

            {/* SECCIÓN PRODUCTO */}
            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-3">
                <ShoppingBag size={16} className="text-blue-600" />
                Seleccionar Artículo
              </label>
              <select 
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                value={venta.producto_id}
                onChange={e => setVenta({...venta, producto_id: e.target.value})}
              >
                <option value="">🛍️ ¿Qué producto lleva?</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} — {formatoCOP(p.precio)} {p.categoria === 'Catalogo' ? '📚' : '🏪'}
                  </option>
                ))}
              </select>
              
              {/* Info producto seleccionado */}
              {selectedProduct && (
                <div className="mt-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{selectedProduct.nombre}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedProduct.categoria === 'Propio' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {selectedProduct.categoria === 'Propio' ? '🏪 Producto Propio' : '📚 Catálogo'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{formatoCOP(selectedProduct.precio)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN ABONO */}
            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-3">
                <DollarSign size={16} className="text-green-600" />
                Abono Inicial (COP)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-sm">$</span>
                <input 
                  type="number" 
                  className="w-full p-3 pl-8 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 font-bold text-gray-800" 
                  placeholder="0" 
                  value={venta.abono}
                  onChange={e => setVenta({...venta, abono: Number(e.target.value)})} 
                />
              </div>
              
              {/* Resumen de pago */}
              {selectedProduct && venta.abono > 0 && (
                <div className={`mt-3 p-3 rounded-xl ${isPagado ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total producto:</span>
                      <span className="font-bold">{formatoCOP(selectedProduct.precio)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Abono:</span>
                      <span className="font-bold text-green-600">-{formatoCOP(venta.abono)}</span>
                    </div>
                    <div className="border-t border-dashed border-gray-300 pt-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Saldo restante:</span>
                        <span className={`font-bold text-lg ${isPagado ? 'text-green-600' : 'text-red-600'}`}>
                          {isPagado ? '✓ PAGADO' : formatoCOP(saldoRestante)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BOTÓN FINAL */}
            <button 
              onClick={registrar} 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              disabled={!venta.cliente_id || !venta.producto_id}
            >
              <CreditCard size={22} /> 
              Registrar Venta en Sistema
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Panel de Resumen y Últimas Ventas */}
        <div className="space-y-6">
          
          {/* Tarjeta de Resumen Rápido */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Resumen de hoy
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                <span className="text-gray-300">💰 Total en ventas</span>
                <span className="font-bold text-xl">$0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                <span className="text-gray-300">🛍️ Productos vendidos</span>
                <span className="font-bold text-xl">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                <span className="text-gray-300">👥 Clientes atendidos</span>
                <span className="font-bold text-xl">0</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Información */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={18} className="text-blue-600" />
              Información de la Tienda
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <Store size={18} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Variedades Aura Boutique</p>
                  <p className="text-gray-500">Calzado • Ropa • Lociones</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                <AlertCircle size={18} className="text-amber-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Política de crédito</p>
                  <p className="text-gray-500 text-xs">Los clientes pueden pagar a plazos. El sistema registra automáticamente el estado de la deuda.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <Sparkles size={18} className="text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Acumulación de puntos</p>
                  <p className="text-gray-500 text-xs">Los clientes acumulan puntos por sus compras y pagan sus deudas.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-[10px] text-center text-gray-400 italic flex items-center justify-center gap-1">
                <CreditCard size={10} />
                Zona horaria: Colombia (Bogotá) | Moneda: Peso Colombiano (COP)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}