import { createClient } from '@supabase/supabase-js'

// ==============================
// 🔹 VARIABLES DE ENTORNO
// ==============================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ==============================
// 🔹 VALIDACIÓN (IMPORTANTE)
// ==============================
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: Variables de entorno no definidas")
  console.error("URL:", supabaseUrl)
  console.error("KEY:", supabaseKey)
  throw new Error("Supabase no configurado correctamente")
}

// ==============================
// 🔹 CLIENTE SUPABASE
// ==============================
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

// ==============================
// 🔹 UTILIDADES
// ==============================

// 💰 Formato moneda COP
export const formatoCOP = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor || 0);
};

// 📅 Fecha Colombia
export const getFechaColombia = () => {
  return new Date().toLocaleString("sv-SE", {
    timeZone: "America/Bogota"
  });
};

// ==============================
// 🔹 LOG DE INICIO
// ==============================
console.log("🚀 Supabase conectado correctamente");