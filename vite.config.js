import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // ✅ Cambiado: 'terser' -> 'esbuild' (no requiere instalación adicional)
    rollupOptions: {
      output: {
        manualChunks: {
          // Opcional: divide el código en chunks para mejor rendimiento
          vendor: ['react', 'react-dom', 'lucide-react'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  }
})