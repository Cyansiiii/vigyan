import * as THREE from 'three';

/**
 * FUTURE CANVAS V3: SCROLLYTELLING EXPERIENCE
 * Transitions particles between specific advanced scientific concepts:
 * 1. String Theory / Quantum Field Theory (Physics)
 * 2. Neural Networks / Biophysics (Intelligence / Biology)
 * 3. Relativity / Spacetime Warping (Cosmos - Gravity Well)
 *
 * Optimized for performance: fixed BufferGeometry, no listeners left hanging.
 */

class Future3DExperience {
    constructor() {
        this.container = document.getElementById('future-3d-canvas-container');
        if (!this.container) return;

        // Core Three.js Setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x020617, 0.002);
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 150);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Lower particle count for better CPU performance during Transitions
        this.particleCount = window.innerWidth < 768 ? 12000 : 25000;

        // Target Layouts Arrays
        this.targetsStringTheory = new Float32Array(this.particleCount * 3);
        this.targetsNeuralNet = new Float32Array(this.particleCount * 3);
        this.targetsRelativity = new Float32Array(this.particleCount * 3);

        // Active Positions and Colors
        this.positions = new Float32Array(this.particleCount * 3);
        this.colors = new Float32Array(this.particleCount * 3);

        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.PointsMaterial({
            size: 0.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = null;
        this.clock = new THREE.Clock();
        this.mouse = new THREE.Vector2(0, 0);
        this.scrollProgress = 0; // Ranges 0.0 to 1.0

        // Connections for Neural Network Lines
        this.lineGeometry = new THREE.BufferGeometry();
        this.lineMaterial = new THREE.LineBasicMaterial({
            color: 0x8b5cf6, // Purple
            transparent: true,
            opacity: 0, // Starts hidden until Neural Net phase
            blending: THREE.AdditiveBlending
        });
        this.lines = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);

        // Internal bindings for cleanup
        this.onResize = this._onResize.bind(this);
        this.onMouseMove = this._onMouseMove.bind(this);
        this.onScroll = this._onScroll.bind(this);
        this.animationFrameId = null;

        this.init();
    }

    init() {
        this.generateStringTheoryLayout();
        this.generateNeuralNetLayout();
        this.generateRelativityLayout();

        // 1. Initialize Particles at String Theory Position
        for (let i = 0; i < this.particleCount * 3; i++) {
            this.positions[i] = this.targetsStringTheory[i];
            // Initial color: Cyan / Blue for Quantum Fields
            if (i % 3 === 0) this.colors[i] = 0.0;     // R
            if (i % 3 === 1) this.colors[i] = 0.8;     // G
            if (i % 3 === 2) this.colors[i] = 1.0;     // B
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

        // Used to store the 'target' position currently trending towards
        this.geometry.setAttribute('targetPos', new THREE.BufferAttribute(new Float32Array(this.particleCount * 3), 3));

        // Random offsets for organic, independent motion per particle
        const randomOffsets = new Float32Array(this.particleCount);
        for (let i = 0; i < this.particleCount; i++) randomOffsets[i] = Math.random() * Math.PI * 2;
        this.geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1));

        this.particles = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particles);

        // 2. Initialize Lines for Neural Net (pre-allocated)
        // We only draw lines for the first ~800 particles to save performance
        const maxLines = 800;
        const linePositions = new Float32Array(maxLines * 2 * 3); // 2 vertices per line (start, end)
        this.lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        this.scene.add(this.lines);

        this.addListeners();
        this.setupScrollTrigger();

        this.animate();
    }

    // SCENE 1: STRING THEORY / QUANTUM FIELD
    generateStringTheoryLayout() {
        // Vibrating multidimensional strings / calabi-yau inspired folds
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            // Place particles along several 3D sine wave "strings"
            const stringIndex = i % 20; // 20 different strings
            const t = (i / this.particleCount) * Math.PI * 2 * 10; // spread along string

            const radius = 30 + (stringIndex * 2);
            // Creates wavy, intersecting rings
            const x = Math.cos(t) * radius + Math.sin(t * 3) * 10;
            const y = Math.sin(t) * radius + Math.cos(t * 4) * 10;
            const z = Math.sin(t * 2 + stringIndex) * 20;

            this.targetsStringTheory[i3] = x;
            this.targetsStringTheory[i3 + 1] = y;
            this.targetsStringTheory[i3 + 2] = z;
        }
    }

    // SCENE 2: NEURAL NETWORKS / BIOPHYSICS
    generateNeuralNetLayout() {
        // Massive interconnected brain structure (Cluster in center, branching out)
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;

            // Sphere volume distribution with concentration near center
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);

            // Bias towards center (power < 1 pushes to center)
            const r = Math.pow(Math.random(), 1.5) * 80;

            const x = r * Math.sin(phi) * Math.cos(theta);
            // Elongate slightly like a brain hemisphere
            const y = r * Math.sin(phi) * Math.sin(theta) * 0.8;
            const z = r * Math.cos(phi);

            this.targetsNeuralNet[i3] = x;
            this.targetsNeuralNet[i3 + 1] = y + 10; // Shift up slightly
            this.targetsNeuralNet[i3 + 2] = z;
        }
    }

    // SCENE 3: RELATIVITY / SPACETIME WARPING
    generateRelativityLayout() {
        // Flat Spacetime grid that dips violently into a gravity well (Black hole)
        const gridSize = Math.ceil(Math.sqrt(this.particleCount));
        const spacing = 180 / gridSize;
        const offset = (gridSize * spacing) / 2;

        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;

            const x = (col * spacing) - offset;
            const z = (row * spacing) - offset;

            // Calculate gravity well dip
            const distToCenter = Math.sqrt(x * x + z * z);
            let y = 0;

            // If close to center, warp severely downwards
            if (distToCenter < 60) {
                // Exponential dip
                y = -100 * Math.pow((60 - distToCenter) / 60, 2);
            }

            // Tilt the whole grid for dramatic viewing angle
            const tilt = Math.PI / 4;
            const tiltedY = y * Math.cos(tilt) - z * Math.sin(tilt);
            const tiltedZ = y * Math.sin(tilt) + z * Math.cos(tilt);

            this.targetsRelativity[i3] = x;
            this.targetsRelativity[i3 + 1] = tiltedY;
            this.targetsRelativity[i3 + 2] = tiltedZ;
        }
    }

    addListeners() {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    _onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    _onMouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    _onScroll() {
        // Used as fallback if GSAP isn't bound
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
            this.scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        }
    }

    setupScrollTrigger() {
        setTimeout(() => {
            if (window.gsap && window.ScrollTrigger) {
                const scrollyContainer = document.getElementById('scrollytelling-container');
                if (scrollyContainer) {
                    window.gsap.to(this, {
                        scrollProgress: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: scrollyContainer,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.1
                        }
                    });
                }
            } else {
                window.addEventListener('scroll', this.onScroll);
            }
        }, 500);
    }

    updateNeuralLines() {
        // Only draw lines during the Neural Network phase (roughly scrollProgress 0.33 to 0.66)
        // If not in this phase, hide lines to save GPU
        if (this.scrollProgress < 0.2 || this.scrollProgress > 0.8) {
            this.lineMaterial.opacity = 0;
            return;
        }

        // Fade lines in and out based on proximity to 0.5 (peak Neural target)
        const intensity = 1.0 - Math.abs(this.scrollProgress - 0.5) * 3.0; // peaking at 0.5
        this.lineMaterial.opacity = Math.max(0, Math.min(intensity, 0.4));

        if (this.lineMaterial.opacity <= 0) return;

        const positions = this.geometry.attributes.position.array;
        const linePositions = this.lines.geometry.attributes.position.array;

        let lineIndex = 0;
        const maxLines = linePositions.length / 6; // 6 floats per line (2 verts * 3)

        // Connect first few particles to each other if they are close
        // (Simplified O(N^2) search heavily limited by N=150)
        for (let i = 0; i < 150; i++) {
            const i3 = i * 3;
            // Start connecting to subsequent particles
            for (let j = i + 1; j < 250; j++) {
                if (lineIndex >= maxLines) break;

                const j3 = j * 3;
                const dx = positions[i3] - positions[j3];
                const dy = positions[i3 + 1] - positions[j3 + 1];
                const dz = positions[i3 + 2] - positions[j3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                // If within binding range (~15 units)
                if (distSq < 225) {
                    linePositions[lineIndex * 6] = positions[i3];
                    linePositions[lineIndex * 6 + 1] = positions[i3 + 1];
                    linePositions[lineIndex * 6 + 2] = positions[i3 + 2];

                    linePositions[lineIndex * 6 + 3] = positions[j3];
                    linePositions[lineIndex * 6 + 4] = positions[j3 + 1];
                    linePositions[lineIndex * 6 + 5] = positions[j3 + 2];
                    lineIndex++;
                }
            }
        }

        // Hide remaining unused lines by pushing them to center
        for (let i = lineIndex; i < maxLines; i++) {
            for (let k = 0; k < 6; k++) linePositions[i * 6 + k] = 0;
        }

        this.lines.geometry.attributes.position.needsUpdate = true;
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();
        const positions = this.geometry.attributes.position.array;
        const colors = this.geometry.attributes.color.array;
        const randomOffsets = this.geometry.attributes.randomOffset.array;
        const targetBuffer = this.geometry.attributes.targetPos.array; // used to hold blended targets

        // 1. DETERMINE CURRENT TARGET & COLOR MORPH BASED ON SCROLL
        let pColorR = 0, pColorG = 0.8, pColorB = 1.0; // Base: Cyan
        let currentTarget = this.targetsStringTheory;

        // SCENE 1: STRING THEORY
        if (this.scrollProgress < 0.25) {
            currentTarget = this.targetsStringTheory;
            pColorR = 0.0; pColorG = 0.8; pColorB = 1.0;
        }
        // TRANSITION 1 -> 2
        else if (this.scrollProgress < 0.4) {
            const t = (this.scrollProgress - 0.25) / 0.15; // normalize 0->1
            this.lerpArrays(this.targetsStringTheory, this.targetsNeuralNet, targetBuffer, t);
            currentTarget = targetBuffer;
            // Interp color to Purple (Neural)
            pColorR = 0.0 + (0.5 - 0.0) * t;
            pColorG = 0.8 + (0.2 - 0.8) * t;
            pColorB = 1.0 + (0.9 - 1.0) * t;
        }
        // SCENE 2: NEURAL NETWORKS
        else if (this.scrollProgress < 0.6) {
            currentTarget = this.targetsNeuralNet;
            pColorR = 0.5; pColorG = 0.2; pColorB = 0.9; // Purple
        }
        // TRANSITION 2 -> 3
        else if (this.scrollProgress < 0.75) {
            const t = (this.scrollProgress - 0.6) / 0.15;
            this.lerpArrays(this.targetsNeuralNet, this.targetsRelativity, targetBuffer, t);
            currentTarget = targetBuffer;
            // Interp color from Purple to Deep Blue/White (Spacetime)
            pColorR = 0.5 + (0.1 - 0.5) * t;
            pColorG = 0.2 + (0.3 - 0.2) * t;
            pColorB = 0.9 + (0.9 - 0.9) * t;
        }
        // SCENE 3: RELATIVITY
        else {
            currentTarget = this.targetsRelativity;
            pColorR = 0.1; pColorG = 0.3; pColorB = 0.9; // Deep Blue
        }

        // 2. APPLY TARGETS & SUBTLE PHYSICS MOTION
        // We avoid heavy Math inside loop if possible. 
        // We use lerp for smooth trailing effect.
        const lerpFactor = 0.08;

        // Motion modifiers specific to scenes
        const isStringTheory = this.scrollProgress < 0.4;
        const isRelativity = this.scrollProgress > 0.6;

        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            const offset = randomOffsets[i];

            // Add subtle floating motion
            let floatX = 0, floatY = 0, floatZ = 0;

            if (isStringTheory) {
                // Vibrating string effect
                floatX = Math.sin(time * 3.0 + offset) * 1.5;
                floatY = Math.cos(time * 3.5 + offset) * 1.5;
            } else if (isRelativity) {
                // Ripple effect propagating through the grid
                const distToCenter = Math.sqrt(currentTarget[i3] * currentTarget[i3] + currentTarget[i3 + 2] * currentTarget[i3 + 2]);
                floatY = Math.sin(distToCenter * 0.1 - time * 4.0) * 3.0; // Gravity waves
            } else {
                // Neural net - distinct pulsing
                floatX = Math.sin(time + offset) * 0.5;
                floatY = Math.cos(time * 0.8 + offset) * 0.5;
            }

            const targetX = currentTarget[i3] + floatX;
            const targetY = currentTarget[i3 + 1] + floatY;
            const targetZ = currentTarget[i3 + 2] + floatZ;

            // Ease towards target
            positions[i3] += (targetX - positions[i3]) * lerpFactor;
            positions[i3 + 1] += (targetY - positions[i3 + 1]) * lerpFactor;
            positions[i3 + 2] += (targetZ - positions[i3 + 2]) * lerpFactor;

            // Sparkle Colors
            const spark = Math.pow(Math.sin(time * 2.0 + offset), 8) * 0.3; // Sharp spike of brightness occasionally
            colors[i3] += (pColorR + spark - colors[i3]) * 0.1;
            colors[i3 + 1] += (pColorG + spark - colors[i3 + 1]) * 0.1;
            colors[i3 + 2] += (pColorB + spark - colors[i3 + 2]) * 0.1;
        }

        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.color.needsUpdate = true;

        // 3. UPDATE NEURAL NETWORK LINES
        this.updateNeuralLines();

        // 4. GLOBAL CAMERA AND ROTATION
        const targetCamX = this.mouse.x * 25;
        const targetCamY = this.mouse.y * 25;
        this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
        this.camera.position.y += (targetCamY - this.camera.position.y) * 0.05;
        this.camera.lookAt(0, 0, 0);

        // Global Scene rotation
        this.particles.rotation.y = time * 0.05;
        if (this.scrollProgress > 0.6) {
            // Spacetime vortex spins faster and tilts
            this.particles.rotation.y -= (this.scrollProgress - 0.6) * 1.0;
        } else {
            this.particles.rotation.x = 0; // return to normal tilt
        }

        // Sync line rotation with particles
        this.lines.rotation.copy(this.particles.rotation);

        this.renderer.render(this.scene, this.camera);
    }

    // High performance array interpolator
    lerpArrays(arrA, arrB, targetBuffer, t) {
        for (let i = 0, len = arrA.length; i < len; i++) {
            targetBuffer[i] = arrA[i] + (arrB[i] - arrA[i]) * t;
        }
    }

    // Cleanup resources
    dispose() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('scroll', this.onScroll);

        if (this.geometry) this.geometry.dispose();
        if (this.material) this.material.dispose();
        if (this.lineGeometry) this.lineGeometry.dispose();
        if (this.lineMaterial) this.lineMaterial.dispose();
        if (this.renderer) this.renderer.dispose();

        if (this.container && this.renderer.domElement) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

// Initialize on load
window.addEventListener('load', () => {
    // Only init if the container exists
    if (document.getElementById('future-3d-canvas-container')) {
        window.future3D = new Future3DExperience();
    }
});
