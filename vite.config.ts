import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: "/dist/",
    plugins: [

        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                about: path.resolve(__dirname, 'aboutpage.html'),
                niser: path.resolve(__dirname, 'niser-pyq.html'),
                iiser: path.resolve(__dirname, 'iiserpyqhome.html'),
                subtittle: path.resolve(__dirname, 'subtittlepyq.html'),
                niser_matrix: path.resolve(__dirname, 'frontend/index-niser-pyq/index.html'),
            }
        }
    }
})
