import * as THREE from 'three';

export class QuantumModule {
    constructor(scene, yOffset) {
        this.group = new THREE.Group();
        this.group.position.set(0, -yOffset, 0);

        // Nucleus
        const coreGeo = new THREE.IcosahedronGeometry(3, 1);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        this.core = new THREE.Mesh(coreGeo, coreMat);
        this.group.add(this.core);

        // Electron Probability Cloud - GPU Optimized
        const count = 3000;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const wobbleSpeeds = new Float32Array(count); // Custom attribute for shader

        const colorCore = new THREE.Color(0xef4444); // Red
        const colorEdge = new THREE.Color(0x3b82f6); // Blue

        for (let i = 0; i < count; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);

            // Bias radius heavily towards the center
            const r = Math.pow(Math.random(), 2) * 50 + 5;

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // Color based on distance from core
            const distRatio = Math.min(r / 50, 1);
            const mixedColor = new THREE.Color().lerpColors(colorCore, colorEdge, distRatio);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            wobbleSpeeds[i] = Math.random() * 5.0; // Shader wobble multiplier
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('aWobbleSpeed', new THREE.BufferAttribute(wobbleSpeeds, 1));

        // GPU Shader Material (Replaces CPU loop)
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 1.5 }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uSize;
                attribute vec3 color;
                attribute float aWobbleSpeed;
                varying vec3 vColor;
                
                void main() {
                    vColor = color;
                    
                    // Add wobble based on time and individual particle speed
                    vec3 pos = position;
                    float wave = sin(uTime * aWobbleSpeed) * 1.5;
                    
                    // Push outwards slightly along normal vector
                    vec3 dir = normalize(pos);
                    pos += dir * wave;

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = uSize * (100.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    // Soft circle
                    float d = distance(gl_PointCoord, vec2(0.5));
                    if (d > 0.5) discard;
                    
                    // Faded edges
                    float alpha = smoothstep(0.5, 0.1, d) * 0.8;
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.cloud = new THREE.Points(geo, mat);
        this.group.add(this.cloud);

        // Outer Rings (Orbitals)
        const ringGeo = new THREE.TorusGeometry(35, 0.1, 4, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3 });

        this.ring1 = new THREE.Mesh(ringGeo, ringMat);
        this.ring1.rotation.x = Math.PI / 2;
        this.group.add(this.ring1);

        this.ring2 = new THREE.Mesh(ringGeo, ringMat);
        this.ring2.rotation.y = Math.PI / 4;
        this.ring2.rotation.x = Math.PI / 4;
        this.group.add(this.ring2);

        scene.add(this.group);
        this.time = 0;
    }

    update(delta) {
        this.time += delta;

        // Simple rotation of group
        this.core.rotation.x += delta * 0.5;
        this.core.rotation.y += delta * 0.8;

        this.ring1.rotation.y += delta * 0.2;
        this.ring2.rotation.y += delta * 0.3;
        this.ring2.rotation.x += delta * 0.1;

        // Pass time to GPU shader instead of iterating Array
        this.cloud.material.uniforms.uTime.value = this.time;
        this.cloud.rotation.y += delta * 0.1;

        this.group.rotation.y += delta * 0.05;
    }
}
