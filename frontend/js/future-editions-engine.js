import * as THREE from 'three';
import { RamanujanModule } from './modules/RamanujanModule.js';
import { KeplerModule } from './modules/KeplerModule.js';
import { NewtonModule } from './modules/NewtonModule.js';
import { DnaModule } from './modules/DnaModule.js';
import { QuantumModule } from './modules/QuantumModule.js';

class EditionsEngine {
    constructor() {
        this.canvas = document.getElementById('editions-canvas');
        if (!this.canvas) return;

        this.lastTime = performance.now();
        this.camVars = { yOffset: 0, lookAtY: 0, zDist: 100 }; // To track scroll position

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        this.initThreeJS();

        // Modular Initialization
        this.ramanujan = new RamanujanModule(this.scene, 0);
        this.kepler = new KeplerModule(this.scene, 1000);
        this.newton = new NewtonModule(this.scene, 2000);
        this.dna = new DnaModule(this.scene, 3000);
        this.quantum = new QuantumModule(this.scene, 4000);

        this.setupCameraScrollAnimation();
        this.animate();

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    initThreeJS() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x020617);
        this.scene.fog = new THREE.FogExp2(0x020617, 0.001);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.camera.position.set(0, 0, 100);
        this.cameraLookAtTarget = new THREE.Vector3(0, 0, 0);
        this.camera.lookAt(this.cameraLookAtTarget);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: "high-performance",
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    setupCameraScrollAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // Move to Kepler (Y=-1000)
        tl.to(this.camVars, {
            yOffset: -1000,
            lookAtY: -1000,
            zDist: 150,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.position.y = this.camVars.yOffset;
                this.camera.position.z = this.camVars.zDist;
                this.cameraLookAtTarget.y = this.camVars.lookAtY;
            }
        });

        // Move to Newton (Y=-2000)
        tl.to(this.camVars, {
            yOffset: -2000,
            lookAtY: -2000,
            zDist: 120,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.position.y = this.camVars.yOffset;
                this.camera.position.z = this.camVars.zDist;
                this.cameraLookAtTarget.y = this.camVars.lookAtY;
            }
        });

        // Move to DNA Biosciences (Y=-3000)
        tl.to(this.camVars, {
            yOffset: -3000,
            lookAtY: -3000,
            zDist: 140, // Pull out slightly for massive helix
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.position.y = this.camVars.yOffset;
                this.camera.position.z = this.camVars.zDist;
                this.cameraLookAtTarget.y = this.camVars.lookAtY;
            }
        });

        // Move to Quantum Data (Y=-4000)
        tl.to(this.camVars, {
            yOffset: -4000,
            lookAtY: -4000,
            zDist: 180, // Very far pull out for huge probability cloud
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.position.y = this.camVars.yOffset;
                this.camera.position.z = this.camVars.zDist;
                this.cameraLookAtTarget.y = this.camVars.lookAtY;
            }
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        const currentTime = performance.now();
        const delta = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        // PERFORMANCE OPTIMIZATION (Kluster feedback)
        // Only run simulations if they are actively in or near the camera's view.
        const y = this.camVars.yOffset;

        // Ramanujan is at 0 (Active between 0 and -500 roughly)
        if (y > -500) {
            this.ramanujan.update(delta);
        }

        // Kepler is at -1000 (Active between -500 and -1500 roughly)
        if (y <= -500 && y > -1500) {
            this.kepler.update(delta);
        }

        // Newton is at -2000 (Active between -1500 and -2500)
        if (y <= -1500 && y > -2500) {
            this.newton.update(delta);
        }

        // DNA is at -3000 (Active between -2500 and -3500)
        if (y <= -2500 && y > -3500) {
            this.dna.update(delta);
        }

        // Quantum is at -4000 (Active beyond -3500)
        if (y <= -3500) {
            this.quantum.update(delta);
        }

        this.camera.lookAt(this.cameraLookAtTarget);
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.animate.bind(this));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.editionsEngine = new EditionsEngine();
});
