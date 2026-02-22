import * as THREE from 'three';

export class NewtonModule {
    constructor(scene, yOffset) {
        this.group = new THREE.Group();
        this.group.position.set(0, -yOffset, 0);
        this.objects = [];

        const boxSize = 80;
        this.boxSize = boxSize;
        const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        const boxMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.1 });
        const box = new THREE.Mesh(boxGeo, boxMat);
        this.group.add(box);

        const count = 150;
        const radius = 1.5;
        const sphereGeo = new THREE.SphereGeometry(radius, 16, 16);

        for (let i = 0; i < count; i++) {
            const mat = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.4 + Math.random() * 0.2, 1, 0.6),
                roughness: 0.2,
                metalness: 0.8
            });
            const mesh = new THREE.Mesh(sphereGeo, mat);

            mesh.position.set(
                (Math.random() - 0.5) * (boxSize - radius * 2),
                (Math.random() - 0.5) * (boxSize - radius * 2),
                (Math.random() - 0.5) * (boxSize - radius * 2)
            );

            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );

            this.group.add(mesh);
            this.objects.push({ mesh, velocity, radius });
        }

        const massiveGeo = new THREE.SphereGeometry(8, 32, 32);
        const massiveMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        this.massiveObj = new THREE.Mesh(massiveGeo, massiveMat);
        this.group.add(this.massiveObj);

        this.gravityStrengthLine = 80;

        scene.add(this.group);
    }

    update(delta) {
        const halfBox = this.boxSize / 2;

        this.objects.forEach((obj) => {
            obj.mesh.position.addScaledVector(obj.velocity, delta);

            const dir = new THREE.Vector3().subVectors(this.massiveObj.position, obj.mesh.position);
            const distSq = dir.lengthSq();
            if (distSq > Math.pow(obj.radius + 8, 2)) {
                dir.normalize();
                const force = this.gravityStrengthLine / distSq;
                obj.velocity.addScaledVector(dir, force * delta * 50);
            }

            ['x', 'y', 'z'].forEach(axis => {
                if (obj.mesh.position[axis] > halfBox - obj.radius) {
                    obj.mesh.position[axis] = halfBox - obj.radius;
                    obj.velocity[axis] *= -1;
                } else if (obj.mesh.position[axis] < -halfBox + obj.radius) {
                    obj.mesh.position[axis] = -halfBox + obj.radius;
                    obj.velocity[axis] *= -1;
                }
            });
        });

        this.group.rotation.y += delta * 0.1;
        this.group.rotation.x += delta * 0.05;
    }
}
