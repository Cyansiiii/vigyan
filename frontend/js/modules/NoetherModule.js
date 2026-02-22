// frontend/js/modules/NoetherModule.js
export class NoetherModule {
    constructor(scene, baseY) {
        this.baseY = baseY;
        this.group = new THREE.Group();
        this.group.position.set(0, baseY, 0);

        // TEXTBOOK DIAGRAM AESTHETIC

        // The Central Potential (Basic dot)
        const centerGeom = new THREE.SphereGeometry(1.5, 16, 16);
        const centerMat = new THREE.MeshBasicMaterial({ color: 0x0f172a }); // Solid dark
        this.centerMass = new THREE.Mesh(centerGeom, centerMat);
        this.group.add(this.centerMass);

        // The Orbit Path (Solid path line)
        const orbitRadius = 20;
        const orbitCurve = new THREE.EllipseCurve(0, 0, orbitRadius, orbitRadius, 0, 2 * Math.PI, false, 0);
        const orbitPoints = orbitCurve.getPoints(64);
        const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitLineMat = new THREE.LineBasicMaterial({ color: 0x64748b });
        const orbitLine = new THREE.Line(orbitGeom, orbitLineMat);
        orbitLine.rotation.x = Math.PI / 2;
        this.group.add(orbitLine);

        // The Particle (Solid blue dot)
        const particleGeom = new THREE.SphereGeometry(2, 16, 16);
        const particleMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
        this.particle = new THREE.Mesh(particleGeom, particleMat);
        this.group.add(this.particle);

        // VECTOR: Position 'r' (Blue arrow)
        this.rArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), orbitRadius, 0x3b82f6, 3, 3);
        this.group.add(this.rArrow);

        // VECTOR: Momentum 'p' (Red arrow)
        this.pVectorLen = 12;
        this.pArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), this.particle.position, this.pVectorLen, 0xef4444, 3, 3);
        this.group.add(this.pArrow);

        // VECTOR: Angular Momentum 'L' = r x p (Gold arrow, constantly fixed)
        const lDir = new THREE.Vector3(0, 1, 0); // Up
        this.lArrow = new THREE.ArrowHelper(lDir, new THREE.Vector3(0, 0, 0), 25, 0xf59e0b, 4, 4);
        this.group.add(this.lArrow);

        // Tilt the system so we can see all 3 dimensions
        this.group.rotation.x = 0.4;
        this.group.rotation.z = 0.2;

        scene.add(this.group);
    }

    update(time) {
        // Animate particle orbit
        const orbitRadius = 20;
        const omega = 1.0; // angular velocity

        const x = Math.cos(time * omega) * orbitRadius;
        const z = -Math.sin(time * omega) * orbitRadius;

        this.particle.position.set(x, 0, z);

        // Update Position Vector 'r' extending from origin to particle
        const rDir = new THREE.Vector3(x, 0, z).normalize();
        this.rArrow.setDirection(rDir);

        // Update Momentum Vector 'p' (tangent to orbit)
        const vx = -Math.sin(time * omega);
        const vz = -Math.cos(time * omega);
        const pDir = new THREE.Vector3(vx, 0, vz).normalize();

        this.pArrow.position.copy(this.particle.position);
        this.pArrow.setDirection(pDir);
    }
}
