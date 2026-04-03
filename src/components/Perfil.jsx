import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Save, Store, User, Phone, MapPin, Mail, Sparkles } from 'lucide-react';

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState({
    nombre_tienda: '',
    propietario: '',
    telefono: '',
    direccion: '',
    email: '',
    lema: ''
  });

  useEffect(() => {
    getPerfil();
  }, []);

  async function getPerfil() {
    try {
      // Forzamos la búsqueda del ID 1 que configuramos en el script SQL
      const { data, error } = await supabase
        .from('perfil')
        .select('*')
        .eq('id', 1) 
        .single();
      
      if (data) setDatos(data);
    } catch (error) {
      console.log("Error cargando perfil:", error);
    } finally {
      setLoading(false);
    }
  }

  async function actualizarPerfil() {
    setLoading(true);
    try {
      // Usamos update con el filtro eq(id, 1) para asegurar que sobreescriba el registro correcto
      const { error } = await supabase
        .from('perfil')
        .update({
          nombre_tienda: datos.nombre_tienda,
          propietario: datos.propietario,
          telefono: datos.telefono,
          direccion: datos.direccion,
          email: datos.email,
          lema: datos.lema,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) throw error;
      alert("¡Perfil de la Boutique actualizado con éxito! ✨");
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold uppercase tracking-widest animate-pulse">Cargando datos de la tienda...</div>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="h-32 bg-gradient-to-r from-fuchsia-600 to-purple-700 flex items-end p-8">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center -mb-12 border-4 border-white">
            <span className="text-4xl font-black text-fuchsia-600">A</span>
          </div>
        </div>

        <div className="p-8 pt-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Configuración de Boutique</h2>
              <p className="text-slate-500 text-sm">Información oficial de Variedades Aura</p>
            </div>
            <button 
              onClick={actualizarPerfil}
              className="flex items-center gap-2 bg-[#0f172a] text-white px-6 py-3 rounded-xl font-bold hover:bg-fuchsia-600 transition-all shadow-lg active:scale-95"
            >
              <Save size={18} /> Guardar Cambios
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nombre de la Tienda" icon={<Store size={18}/>} value={datos.nombre_tienda} 
              onChange={e => setDatos({...datos, nombre_tienda: e.target.value})} />
            
            <Input label="Propietario / Admin" icon={<User size={18}/>} value={datos.propietario} 
              onChange={e => setDatos({...datos, propietario: e.target.value})} />

            <Input label="Teléfono de Contacto" icon={<Phone size={18}/>} value={datos.telefono} 
              onChange={e => setDatos({...datos, telefono: e.target.value})} />

            <Input label="Correo Electrónico" icon={<Mail size={18}/>} value={datos.email} 
              onChange={e => setDatos({...datos, email: e.target.value})} />

            <Input label="Dirección Física" icon={<MapPin size={18}/>} value={datos.direccion} 
              onChange={e => setDatos({...datos, direccion: e.target.value})} />

            <Input label="Eslogan / Lema" icon={<Sparkles size={18}/>} value={datos.lema} 
              onChange={e => setDatos({...datos, lema: e.target.value})} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-fuchsia-500">{icon}</div>
        <input 
          type="text" 
          value={value || ''} 
          onChange={onChange}
          className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-fuchsia-500 transition-all outline-none"
        />
      </div>
    </div>
  );
}