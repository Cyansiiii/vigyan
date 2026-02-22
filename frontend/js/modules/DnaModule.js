import * as THREE from 'three';

export class DnaModule {
    constructor(scene, yOffset) {
        this.group = new THREE.Group();
        this.group.position.set(0, -yOffset, 0);
        this.time = 0;

        const particleCount = 200; // Number of base pairs
        const radius = 10;
        this.heightPhase = 2.5;
        this.particleCount = particleCount;
        this.radius = radius;

        // Optimization: InstancedMesh for Spheres (2 per pair = 400 spheres)
        const sphereGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const sphereMat = new THREE.MeshStandardMaterial({
            roughness: 0.2,
            metalness: 0.8,
        });
        this.sphereMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, particleCount * 2);

        // Optimization: InstancedMesh for Links (200 links)
        const linkGeo = new THREE.CylinderGeometry(0.2, 0.2, radius * 2, 8);
        linkGeo.rotateZ(Math.PI / 2);
        const linkMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
        this.linkMesh = new THREE.InstancedMesh(linkGeo, linkMat, particleCount);

        const dummy = new THREE.Object3D();
        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            const y = (i - particleCount / 2) * this.heightPhase;
            const angle = i * 0.3; // Twist rate

            // Color gradient from cyan to purple
            const mixRatio = i / particleCount;
            color.lerpColors(
                new THREE.Color(0x06b6d4), // Cyan
                new THREE.Color(0xa855f7), // Purple
                mixRatio
            );

            // Strand A (Even index)
            dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
            dummy.updateMatrix();
            this.sphereMesh.setMatrixAt(i * 2, dummy.matrix);
            this.sphereMesh.setColorAt(i * 2, color);

            // Strand B (Odd index)
            dummy.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
            dummy.updateMatrix();
            this.sphereMesh.setMatrixAt(i * 2 + 1, dummy.matrix);
            this.sphereMesh.setColorAt(i * 2 + 1, color);

            // Connecting link
            dummy.position.set(0, y, 0);
            dummy.rotation.set(0, -angle, 0); // Rotate to match points
            dummy.updateMatrix();
            this.linkMesh.setMatrixAt(i, dummy.matrix);
        }

        this.sphereMesh.instanceMatrix.needsUpdate = true;
        this.sphereMesh.instanceColor.needsUpdate = true;
        this.linkMesh.instanceMatrix.needsUpdate = true;

        this.group.add(this.sphereMesh);
        this.group.add(this.linkMesh);

        // Tilt the entire helix slightly
        this.group.rotation.x = 0.2;
        this.group.rotation.z = -0.1;

        scene.add(this.group);
    }

    update(delta) {
        this.time += delta * 0.5;

        // Rotate the entire helix
        this.group.rotation.y += delta * 0.2;

        const dummy = new THREE.Object3D();

        // GPU / Matrix Update for the floating wave
        for (let i = 0; i < this.particleCount; i++) {
            const baseY = (i - this.particleCount / 2) * this.heightPhase;
            const angle = i * 0.3;
            const wave = Math.sin(this.time * 2 + i * 0.1) * 2;
            const currentY = baseY + wave;

            // Strand A
            dummy.position.set(Math.cos(angle) * this.radius, currentY, Math.sin(angle) * this.radius);
            dummy.rotation.set(0, 0, 0); // reset
            dummy.updateMatrix();
            this.sphereMesh.setMatrixAt(i * 2, dummy.matrix);

            // Strand B
            dummy.position.set(Math.cos(angle + Math.PI) * this.radius, currentY, Math.sin(angle + Math.PI) * this.radius);
            dummy.updateMatrix();
            this.sphereMesh.setMatrixAt(i * 2 + 1, dummy.matrix);

            // Link
            dummy.position.set(0, currentY, 0);
            dummy.rotation.set(0, -angle, 0);
            dummy.updateMatrix();
            this.linkMesh.setMatrixAt(i, dummy.matrix);
        }

        this.sphereMesh.instanceMatrix.needsUpdate = true;
        this.linkMesh.instanceMatrix.needsUpdate = true;
    }
}
