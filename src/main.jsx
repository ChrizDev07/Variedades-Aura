import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Verifica que este archivo tenga las directivas de Tailwind
import './App.css'   // Importamos los estilos de boutique que creamos
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)