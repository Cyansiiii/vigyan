import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import GlareHover from './components/GlareHover';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const features: Feature[] = [
  { icon: 'fa-flask', title: 'Curated Question Banks', desc: '500+ hand-picked past-year questions with detailed solutions.' },
  { icon: 'fa-chart-line', title: 'Adaptive Test Series', desc: 'AI-powered mock tests mirroring the exact exam pattern of IAT and NEST.' },
  { icon: 'fa-microscope', title: 'Research-Level Depth', desc: 'Content designed by researchers and alumni from IISER, IISc, and NISER.' },
  { icon: 'fa-users', title: 'Peer Community', desc: 'Join 10,000+ aspirants discussing strategies and sharing notes.' },
  { icon: 'fa-calendar-check', title: 'Structured Study Plans', desc: 'Week-by-week schedules tailored for IAT, NEST, and IISc exams.' },
  { icon: 'fa-bolt', title: 'Instant Doubt Resolution', desc: 'Expert panel answers within hours. Never stay stuck.' }
];

const FeaturesList: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-bind the blur-fade observer if available
    const w = window as any;
    if (w.revealObs && listRef.current) {
      const elms = listRef.current.querySelectorAll('.blur-fade');
      elms.forEach(e => w.revealObs.observe(e));
    }
    
    // Feature card tilt mirroring original behavior
    if (w.gsap && listRef.current) {
      const cards = listRef.current.querySelectorAll('.feature-card');
      cards.forEach(card => {
          card.addEventListener('mousemove', (e: any) => { 
            const r = card.getBoundingClientRect(); 
            w.gsap.to(card, {
                rotateY: ((e.clientX - r.left) / r.width - 0.5) * 6,
                rotateX: -((e.clientY - r.top) / r.height - 0.5) * 6,
                transformPerspective: 800,
                duration: 0.4,
                ease: 'power2.out'
            }); 
          });
          card.addEventListener('mouseleave', () => {
            w.gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,.5)' });
          });
      });
    }
  }, []);

  return (
    <div ref={listRef} className="features-grid">
      {features.map((feature, i) => (
        <div key={i} className="blur-fade" style={{ height: '100%', width: '100%', display: 'flex' }}>
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.15}
            glareAngle={-45}
            glareSize={200}
            transitionDuration={800}
            playOnce={false}
            className="feature-card"
            style={{ 
                flex: 1, 
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
                display: 'flex', 
                flexDirection: 'column',
                margin: 0
            }}
          >
            <div className="feature-icon"><i className={`fas ${feature.icon}`}></i></div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </GlareHover>
        </div>
      ))}
    </div>
  );
};

const rootEl = document.getElementById('react-features');
if (rootEl) {
  createRoot(rootEl).render(<FeaturesList />);
}
