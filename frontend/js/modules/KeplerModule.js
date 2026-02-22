import * as THREE from 'three';

export class KeplerModule {
    constructor(scene, yOffset) {
        this.group = new THREE.Group();
        this.group.position.set(0, -yOffset, 0);
        this.objects = [];

        // Central Star
        const sunGeo = new THREE.SphereGeometry(15, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffdd44, wireframe: true });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        this.group.add(sun);

        const glowGeo = new THREE.SphereGeometry(17, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.2 });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        this.group.add(glow);

        // Planets
        const planetsData = [
            { a: 30, e: 0.2, color: 0x3b82f6, size: 3, speed: 0.4 },
            { a: 50, e: 0.6, color: 0xff4444, size: 2, speed: 0.2 },
            { a: 75, e: 0.05, color: 0xa855f7, size: 4, speed: 0.15 }
        ];

        planetsData.forEach(p => {
            const pathGeo = new THREE.BufferGeometry();
            const points = [];
            for (let i = 0; i <= 64; i++) {
                const theta = (i / 64) * Math.PI * 2;
                const r = (p.a * (1 - p.e * p.e)) / (1 + p.e * Math.cos(theta));
                points.push(r * Math.cos(theta), 0, r * Math.sin(theta));
            }
            pathGeo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
            const pathMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
            const pathLine = new THREE.Line(pathGeo, pathMat);

            const c = p.a * p.e;
            pathLine.position.x = -c;
            this.group.add(pathLine);

            const pGeo = new THREE.SphereGeometry(p.size, 16, 16);
            const pMat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.4, metalness: 0.8 });
            const planet = new THREE.Mesh(pGeo, pMat);
            this.group.add(planet);

            this.objects.push({
                mesh: planet,
                a: p.a,
                e: p.e,
                speed: p.speed,
                angle: Math.random() * Math.PI * 2,
                c: c
            });
        });

        this.group.rotation.x = Math.PI / 6;

        scene.add(this.group);
    }

    update(delta) {
        this.objects.forEach(obj => {
            const r = (obj.a * (1 - obj.e * obj.e)) / (1 + obj.e * Math.cos(obj.angle));
            const angularVelocity = obj.speed * (obj.a / (r * r));

            obj.angle += angularVelocity * delta;

            const x = r * Math.cos(obj.angle);
            const z = r * Math.sin(obj.angle);

            obj.mesh.position.set(x, 0, z);
            obj.mesh.rotation.y += delta;
        });

        this.group.rotation.y += delta * 0.05;
    }
}
