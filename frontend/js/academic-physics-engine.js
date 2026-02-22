// frontend/js/academic-physics-engine.js
import { TelescopeModule } from './modules/TelescopeModule.js';
import { PulsarModule } from './modules/PulsarModule.js';
import { NoetherModule } from './modules/NoetherModule.js';

let scene, camera, renderer;
let modules = [];

function init() {
    const canvas = document.getElementById('physics-canvas');
    if (!canvas) return;

    // SCENE SETUP (Light Theme)
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9); // Match CSS canvas-pane bg

    // CAMERA
    // Aspect ratio gets updated in resize handler based on the dynamic flex pane
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    // Position camera far enough back to see the models
    camera.position.set(0, 0, 150);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // LIGHTS (Crisp, Museum Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 100, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 500;

    // Expand shadow camera frustum
    const d = 100;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xbfdbfe, 0.4); // Subtle blue fill
    fillLight.position.set(-50, 0, -50);
    scene.add(fillLight);

    // INIT MODULES
    // Each module will be separated widely on the Y axis to avoid overlap
    modules.push(new TelescopeModule(scene, 0));
    modules.push(new PulsarModule(scene, -2000));
    modules.push(new NoetherModule(scene, -4000));

    window.addEventListener('resize', onWindowResize, false);

    // Initial resize to lock in accurate dimensions of the half-screen canvas
    onWindowResize();

    // Set up GSAP tracking for Camera Y
    setupScrollTracking();

    // Attach overlay references
    setupOverlay();

    animate();
}

function onWindowResize() {
    setTimeout(() => {
        const pane = document.querySelector('.canvas-pane');
        if (!pane) return;
        const width = pane.clientWidth;
        const height = pane.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }, 50); // slight delay to allow flexbox layout to settle
}

let activeOverlayData = null;

function setupOverlay() {
    // If KaTeX is loaded globally, we can use it, else fallback
    window.renderEquation = function (str, element) {
        if (window.katex) {
            window.katex.render(str, element, {
                throwOnError: false,
                displayMode: true
            });
        } else {
            element.innerText = "$$" + str + "$$";
        }
    };
}

function setupScrollTracking() {
    // Sections map perfectly to Y positions
    const sections = [
        { id: '#section-telescope', y: 0, title: 'Antenna Theorem', formula: 'A_e = \\frac{\\lambda^2}{4\\pi} G' },
        { id: '#section-pulsar', y: -2000, title: 'Rotational Kinetic Energy', formula: 'K_{rot} = \\frac{1}{2} I \\omega^2' },
        { id: '#section-noether', y: -4000, title: 'Angular Momentum', formula: '\\mathbf{L} = \\mathbf{r} \\times \\mathbf{p}' }
    ];

    sections.forEach((sec, index) => {
        ScrollTrigger.create({
            trigger: sec.id,
            start: "top center",
            end: "bottom center",
            onEnter: () => moveToSection(sec),
            onEnterBack: () => moveToSection(sec),
        });
    });
}

function moveToSection(sec) {
    // 1. Move Camera Y smoothly
    gsap.to(camera.position, {
        y: sec.y + 150, // Slight offset for framing
        duration: 1.5,
        ease: "power3.inOut"
    });

    // 2. Animate Camera LookAt smoothly
    // Create a dummy object to act as the lookat target
    if (!window.cameraTarget) {
        window.cameraTarget = new THREE.Vector3(0, 0, 0);
    }

    gsap.to(window.cameraTarget, {
        y: sec.y,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
            camera.lookAt(window.cameraTarget);
        }
    });

    // 3. Update the floating HTML overlay
    const overlay = document.getElementById('canvas-overlay');
    const title = document.getElementById('overlay-title');
    const formula = document.getElementById('overlay-formula');

    if (overlay && title && formula) {
        // Fade out, update, fade in
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                title.innerText = sec.title;
                if (window.renderEquation) window.renderEquation(sec.formula, formula);
                gsap.to(overlay, { opacity: 1, duration: 0.4 });
            }
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    const time = performance.now() * 0.001;

    // Only update modules that are near the camera
    modules.forEach(mod => {
        if (Math.abs((camera.position.y - 150) - mod.baseY) < 1500) {
            if (mod.update) mod.update(time);
        }
    });

    renderer.render(scene, camera);
}

// Ensure GSAP is ready before init
window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined' && typeof gsap !== 'undefined') {
        init();
    } else {
        console.error("Three.js or GSAP not loaded.");
    }
});
