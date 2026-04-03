import { useState } from 'react';
import Dashboard from './components/Dashboard';
import VentaModulo from './components/VentaModulo';
import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Egresos from './components/Egresos';
import Perfil from './components/Perfil'; // Importación añadida
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LayoutDashboard, ShoppingBag, Users, Package, Receipt, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

function App() {
  const [tab, setTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22}/> },
    { id: 'ventas', label: 'Ventas y Deudas', icon: <ShoppingBag size={22}/> },
    { id: 'productos', label: 'Inventario', icon: <Package size={22}/> },
    { id: 'clientes', label: 'Clientes', icon: <Users size={22}/> },
    { id: 'egresos', label: 'Gastos', icon: <Receipt size={22}/> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      <div className="z-50">
        <Navbar setTab={setTab} currentTab={tab} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        <aside className={`bg-[#0f172a] text-white transition-all duration-300 ease-in-out flex flex-col shadow-2xl z-40 ${isCollapsed ? 'w-20' : 'w-72'} hidden lg:flex`}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-24 bg-fuchsia-600 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <div className="p-6 mb-4 flex flex-col items-center">
            <div className={`bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-16 h-16'}`}>
              <span className={`text-white font-black transition-all ${isCollapsed ? 'text-xl' : 'text-3xl'}`}>A</span>
            </div>
            {!isCollapsed && (
              <div className="mt-4 text-center animate-in fade-in duration-500">
                <h1 className="text-xl font-black tracking-tighter uppercase">Variedades</h1>
                <span className="block text-[10px] uppercase tracking-[0.4em] text-fuchsia-400 font-bold">Aura Boutique</span>
              </div>
            )}
          </div>
          
          <nav className="flex-1 px-3 space-y-2">
            {menu.map(item => (
              <button 
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center w-full p-4 rounded-2xl transition-all group ${tab === item.id ? 'bg-fuchsia-600 text-white shadow-lg' : 'hover:bg-white/5 text-slate-400 hover:text-white'} ${isCollapsed ? 'justify-center' : 'justify-start gap-4'}`}
              >
                <span className={tab === item.id ? 'scale-110' : 'group-hover:scale-110'}>{item.icon}</span>
                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          <div className="p-6 md:p-10 max-w-6xl mx-auto">
            <header className="mb-8">
              <div className="h-1.5 w-12 bg-fuchsia-600 rounded-full mb-3"></div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
                {/* Ajuste para mostrar "Mi Perfil" en el título cuando esté en esa tab */}
                {tab === 'perfil' ? 'Mi Perfil' : menu.find(m => m.id === tab)?.label}
              </h2>
            </header>
            
            <div className="pb-20">
              {tab === 'dashboard' && <Dashboard />}
              {tab === 'ventas' && <VentaModulo />}
              {tab === 'productos' && <Productos />}
              {tab === 'clientes' && <Clientes />}
              {tab === 'egresos' && <Egresos />}
              {tab === 'perfil' && <Perfil />} {/* Render del componente Perfil */}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;