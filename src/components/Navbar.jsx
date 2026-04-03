import { useState } from 'react';
import { ShoppingBag, Menu, X, User, LogOut, Settings, Heart, LayoutDashboard, Package, Users, Receipt } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function Navbar({ setTab, currentTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0f172a] border-b border-white/5 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo - Clic para ir al Dashboard */}
          <div onClick={() => setTab('dashboard')} className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-fuchsia-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img src={logo} alt="Logo" className="h-10 w-10 relative z-10 object-contain transform group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg tracking-tight uppercase">Variedades Aura</span>
              <span className="text-fuchsia-400 text-[10px] font-bold tracking-[0.2em] uppercase -mt-1">Boutique</span>
            </div>
          </div>

          {/* ESPACIO VACÍO EN DESKTOP (Los enlaces están en la Sidebar) */}
          <div className="hidden md:flex flex-1"></div>

          {/* Right Section: Acciones Globales */}
          <div className="flex items-center space-x-2 md:space-x-5">
            <button className="p-2 text-slate-400 hover:text-fuchsia-400 transition-colors relative">
              <Heart size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-fuchsia-500 rounded-full"></span>
            </button>

            {/* Perfil */}
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-white/5 transition-all">
                <div className="w-8 h-8 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">AD</div>
                <span className="hidden sm:inline text-slate-200 text-xs font-bold uppercase tracking-widest">Admin</span>
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl py-2 z-20 overflow-hidden border border-slate-100">
                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 w-full"><User size={16} /> Perfil</button>
                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 w-full"><Settings size={16} /> Configuración</button>
                    <hr className="my-1 border-slate-100" />
                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full font-bold"><LogOut size={16} /> Salir</button>
                  </div>
                </>
              )}
            </div>

            {/* Botón Móvil */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white bg-white/5 rounded-lg">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil - AQUÍ SÍ VAN LAS OPCIONES DE NAVEGACIÓN */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-white/5 p-4 space-y-2 animate-in slide-in-from-top duration-300">
            <MobileNavLink onClick={() => {setTab('dashboard'); setIsMenuOpen(false)}} active={currentTab === 'dashboard'} icon={<LayoutDashboard size={20}/>}>Dashboard</MobileNavLink>
            <MobileNavLink onClick={() => {setTab('ventas'); setIsMenuOpen(false)}} active={currentTab === 'ventas'} icon={<ShoppingBag size={20}/>}>Ventas</MobileNavLink>
            <MobileNavLink onClick={() => {setTab('productos'); setIsMenuOpen(false)}} active={currentTab === 'productos'} icon={<Package size={20}/>}>Inventario</MobileNavLink>
            <MobileNavLink onClick={() => {setTab('clientes'); setIsMenuOpen(false)}} active={currentTab === 'clientes'} icon={<Users size={20}/>}>Clientes</MobileNavLink>
            <MobileNavLink onClick={() => {setTab('egresos'); setIsMenuOpen(false)}} active={currentTab === 'egresos'} icon={<Receipt size={20}/>}>Gastos</MobileNavLink>
        </div>
      )}
    </nav>
  );
}

function MobileNavLink({ onClick, children, icon, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}
    >
      {icon}
      <span className="font-bold text-sm uppercase tracking-widest">{children}</span>
    </button>
  );
}