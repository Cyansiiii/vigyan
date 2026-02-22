// frontend/js/modules/TelescopeModule.js
export class TelescopeModule {
    constructor(scene, baseY) {
        this.baseY = baseY;
        this.group = new THREE.Group();
        this.group.position.y = baseY;

        // TEXTBOOK DIAGRAM AESTHETIC: Strict, unshaded, line-drawn architecture
        const lineColor = 0x334155; // Slate 700
        const dishLineColor = 0x64748b; // Slate 500
        const receiverColor = 0xef4444; // Red 500

        // Base Mount (Wireframe)
        const baseGeom = new THREE.CylinderGeometry(5, 8, 10, 8);
        const baseEdges = new THREE.EdgesGeometry(baseGeom);
        const base = new THREE.LineSegments(baseEdges, new THREE.LineBasicMaterial({ color: lineColor, linewidth: 1 }));
        base.position.y = -5;
        this.group.add(base);

        // Parabolic Dish (Wireframe)
        const dishGeom = new THREE.SphereGeometry(25, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.5);
        const dishEdges = new THREE.EdgesGeometry(dishGeom);
        const dish = new THREE.LineSegments(dishEdges, new THREE.LineBasicMaterial({ color: dishLineColor, linewidth: 1 }));
        dish.scale.set(1, 0.4, 1);
        dish.position.y = 2;
        dish.rotation.x = -Math.PI / 6;
        this.group.add(dish);

        // Focal point / Receiver (Solid Basic Mesh to stand out)
        const receiverGeom = new THREE.SphereGeometry(1.5, 8, 8);
        const receiverMat = new THREE.MeshBasicMaterial({ color: receiverColor });
        const receiver = new THREE.Mesh(receiverGeom, receiverMat);
        // Positioned relative to the tilted dish center
        receiver.position.set(0, 16, -9);
        this.group.add(receiver);

        // Struts to receiver (Diagram lines)
        const strutMat = new THREE.LineBasicMaterial({ color: lineColor });
        const strut1Geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-15, 6, -5), receiver.position]);
        const strut2Geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(15, 6, -5), receiver.position]);
        const strut3Geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 5, 12), receiver.position]);
        this.group.add(new THREE.Line(strut1Geom, strutMat));
        this.group.add(new THREE.Line(strut2Geom, strutMat));
        this.group.add(new THREE.Line(strut3Geom, strutMat));

        // Incoming Information Waves (Mathematical Vectors)
        this.waves = [];
        this.waveMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.8 }); // Info blue

        for (let i = 0; i < 12; i++) {
            // Start high up, coming straight down parallel
            const x = (Math.random() - 0.5) * 35;
            const z = (Math.random() - 0.5) * 35;

            const startP = new THREE.Vector3(x, 100, z);
            const endP = new THREE.Vector3(x, 100 - 15, z); // 15 unit long wave lines

            const geom = new THREE.BufferGeometry().setFromPoints([startP, endP]);
            const wave = new THREE.Line(geom, this.waveMat);

            // Store original data to reset animation
            wave.userData = { origX: x, origZ: z, phase: Math.random() * Math.PI * 2, speed: 40 + Math.random() * 20 };

            this.group.add(wave);
            this.waves.push(wave);
        }

        scene.add(this.group);
    }

    update(time) {
        // Gently pan the entire telescope
        this.group.rotation.y = Math.sin(time * 0.2) * 0.3;

        // Animate incoming radio waves mapped as vectors hitting the dish
        this.waves.forEach(wave => {
            const data = wave.userData;
            // Move down
            const pathY = 100 - ((time * data.speed + data.phase * 10) % 120);

            // If it hits the dish level (approx y=5), snap it to focus point to simulate reflection
            if (pathY > 5) {
                // Incoming plane wave (Blue)
                const startP = new THREE.Vector3(data.origX, pathY, data.origZ);
                const endP = new THREE.Vector3(data.origX, pathY - 15, data.origZ);
                wave.geometry.setFromPoints([startP, endP]);
                wave.material.color.setHex(0x3b82f6);
                wave.material.opacity = 0.8;
            } else if (pathY > -10) {
                // Reflected wave travelling to focal point (turns Red)
                const hitPoint = new THREE.Vector3(data.origX, 5, data.origZ);
                const focusPoint = new THREE.Vector3(0, 16, -9);

                const progress = (5 - pathY) / 15;

                const currentStart = new THREE.Vector3().lerpVectors(hitPoint, focusPoint, Math.max(0, progress - 0.2));
                const currentEnd = new THREE.Vector3().lerpVectors(hitPoint, focusPoint, Math.min(1, progress + 0.2));

                wave.geometry.setFromPoints([currentStart, currentEnd]);
                wave.material.color.setHex(0xef4444);
                wave.material.opacity = 1 - progress;
            } else {
                // Hidden 
                wave.material.opacity = 0;
            }
        });
    }
}
