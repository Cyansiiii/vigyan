import * as THREE from 'three';

export class RamanujanModule {
    constructor(scene, yOffset) {
        this.group = new THREE.Group();
        this.group.position.set(0, -yOffset, 0);

        this.mathTime = 0;

        const count = 1000;
        const geo = new THREE.OctahedronGeometry(1.5, 0);
        const mat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });

        this.instancedMesh = new THREE.InstancedMesh(geo, mat, count);
        this.group.add(this.instancedMesh);

        this.dummy = new THREE.Object3D();
        this.colorA = new THREE.Color(0xec4899);
        this.colorB = new THREE.Color(0x3b82f6);
        this.tempColor = new THREE.Color();

        scene.add(this.group);
    }

    update(delta) {
        if (!this.instancedMesh) return;
        this.mathTime += delta * 0.5;
        const count = this.instancedMesh.count;

        const time02 = this.mathTime * 0.2;
        const time2 = this.mathTime * 2;
        const time05 = this.mathTime * 0.5;
        const time3 = this.mathTime * 3;

        for (let i = 0; i < count; i++) {
            const phi = i * 0.1375;
            const r = Math.sqrt(i) * 2;

            const yOffset = Math.sin(time2 + i * 0.05) * 5;
            const abstractMod = Math.cos(this.mathTime + i * 0.01) * 2;

            const x = r * Math.cos(phi + time02);
            const z = r * Math.sin(phi + time02) + abstractMod;
            const y = (i - count / 2) * 0.1 + yOffset;

            this.dummy.position.set(x, y, z);
            this.dummy.rotation.x = this.mathTime + i * 0.01;
            this.dummy.rotation.y = time05 + i * 0.02;

            const scale = (Math.sin(time3 + i * 0.1) + 1.5) * 0.5;
            this.dummy.scale.set(scale, scale, scale);

            this.dummy.updateMatrix();
            this.instancedMesh.setMatrixAt(i, this.dummy.matrix);

            const mixRatio = (Math.sin(this.mathTime + i * 0.005) + 1) * 0.5;
            this.tempColor.lerpColors(this.colorA, this.colorB, mixRatio);
            this.instancedMesh.setColorAt(i, this.tempColor);
        }

        this.instancedMesh.instanceMatrix.needsUpdate = true;
        this.instancedMesh.instanceColor.needsUpdate = true;

        this.group.rotation.y += delta * 0.1;
        this.group.rotation.x = Math.sin(time05) * 0.2;
    }
}
