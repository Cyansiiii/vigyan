import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Base path is set to "/" because the app is deployed to the domain root (e.g., vigyanprep.com/)
export default defineConfig({
    base: "/",
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
                future: path.resolve(__dirname, 'future-react.html'),
                niser_matrix: path.resolve(__dirname, 'frontend/index-niser-pyq/index.html'),
            }
        }
    }
})
