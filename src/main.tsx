import React from 'react'
import ReactDOM from 'react-dom/client'
import AboutPage from './pages/AboutPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('react-root')!).render(
    <React.StrictMode>
        <AboutPage />
    </React.StrictMode>,
)
