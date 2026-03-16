import React from 'react';
import { createRoot } from 'react-dom/client';
import SplitText from './components/SplitText';

const App = () => {
    return (
        <React.Fragment>
            <style>
                {`
                .hero-gradient-text .split-char {
                    background: -webkit-linear-gradient(135deg, #fbb06f, #e8720a);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                `}
            </style>
            <SplitText
                text="Gateway to Future Science"
                className="font-display font-medium mb-2 hero-gradient-text"
                style={{ 
                    textAlign: 'center', 
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                    lineHeight: 1.1, 
                    fontFamily: "'Dirtyline36days', 'Cormorant Garamond', serif"
                }}
                delay={50}
                duration={1.2}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, scale: 0.8, y: 40 }}
                to={{ opacity: 1, scale: 1, y: 0 }}
                tag="h1"
            />
            <SplitText 
                text="India's premier platform for IISER IAT, NISER NEST, and research institute entrance preparation."
                className="ov-body"
                style={{ textAlign: "center", fontWeight: 300, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255, 255, 255, 0.6)", maxWidth: "800px", margin: "26px auto 0", lineHeight: 1.6 }}
                delay={20}
                duration={1.2}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                tag="h4"
            />
        </React.Fragment>
    );
};

const rootEl = document.getElementById('react-hero');
if (rootEl) {
    createRoot(rootEl).render(<App />);
}
