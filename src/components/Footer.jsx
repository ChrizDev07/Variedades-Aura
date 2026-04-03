import { Heart, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1 - Logo y Descripción */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Variedades Aura Logo" 
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/48?text=VA';
                }}
              />
              <div>
                <h3 className="text-xl font-black tracking-tight">
                  VARIEDADES
                </h3>
                <p className="text-purple-300 text-xs font-semibold tracking-wider">
                  Aura Boutique
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Tu tienda de confianza para calzado, ropa y lociones de calidad. 
              Moda y estilo para toda ocasión.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Sparkles size={12} className="text-purple-400" />
                Calidad y Estilo
              </span>
            </div>
          </div>

          {/* Columna 2 - Enlaces Rápidos */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-0.5 bg-purple-500"></span>
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Dashboard</a></li>
              <li><a href="/ventas" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Ventas</a></li>
              <li><a href="/productos" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Productos</a></li>
              <li><a href="/clientes" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Clientes</a></li>
              <li><a href="/egresos" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Gastos</a></li>
            </ul>
          </div>

          {/* Columna 3 - Contacto */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-0.5 bg-purple-500"></span>
              Contacto
            </h4>
            <ul className="space-y-3 text-center md:text-left">
              <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-purple-400 flex-shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-purple-400 flex-shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-purple-400 flex-shrink-0" />
                <span>info@variedadesaura.com</span>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Redes Sociales */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-0.5 bg-purple-500"></span>
              Síguenos
            </h4>
            <div className="flex justify-center md:justify-start gap-4 mb-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-white" />
              </a>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500">
                Horario de atención
              </p>
              <p className="text-sm text-gray-400">
                Lun - Sab: 9am - 8pm
              </p>
              <p className="text-sm text-gray-400">
                Dom: 10am - 2pm
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© {currentYear} Variedades Aura</span>
              <span className="hidden md:inline">•</span>
              <span>Todos los derechos reservados</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>Hecho Por ChrizDev</span>
              <Heart size={12} className="text-pink-500 fill-pink-500" />
              <span>para Aura</span>
            </div>
            <div className="flex gap-4 text-xs text-gray-600">
              <a href="/privacidad" className="hover:text-purple-400 transition-colors">Política de privacidad</a>
              <a href="/terminos" className="hover:text-purple-400 transition-colors">Términos de uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}