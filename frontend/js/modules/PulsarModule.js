// frontend/js/modules/PulsarModule.js
export class PulsarModule {
    constructor(scene, baseY) {
        this.baseY = baseY;
        this.group = new THREE.Group();
        this.group.position.set(0, baseY, 0);

        // TEXTBOOK DIAGRAM AESTHETIC

        // The Neutron Star Core (Wireframe sphere)
        const coreGeom = new THREE.SphereGeometry(8, 16, 16);
        const coreEdges = new THREE.EdgesGeometry(coreGeom);
        this.star = new THREE.LineSegments(coreEdges, new THREE.LineBasicMaterial({ color: 0x0f172a, linewidth: 2 }));

        // Render Axis lines using literal Arrows for math rigor
        const arrowLength = 25;

        // Rotation Axis (Omega w) -> Straight Up Y
        const wDir = new THREE.Vector3(0, 1, 0);
        this.wArrow = new THREE.ArrowHelper(wDir, new THREE.Vector3(0, 0, 0), arrowLength, 0x10b981, 3, 3); // Emerald Green

        // Magnetic Axis (mu m) -> Tilted by angle alpha
        this.alpha = Math.PI / 4; // 45 degrees
        const mDir = new THREE.Vector3(Math.sin(this.alpha), Math.cos(this.alpha), 0);
        this.mArrow = new THREE.ArrowHelper(mDir, new THREE.Vector3(0, 0, 0), arrowLength * 1.2, 0x8b5cf6, 3, 3); // Violet Purple

        // Assemble the rotating system
        this.rotatingSystem = new THREE.Group();
        this.rotatingSystem.add(this.star);
        this.rotatingSystem.add(this.mArrow); // Magnetic axis rotates with the star

        // Emission cones along the magnetic axis (Wireframe)
        const coneGeom = new THREE.ConeGeometry(8, 40, 12, 1, true); // open ended
        const coneEdges = new THREE.EdgesGeometry(coneGeom);
        const coneLineMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 });

        const beamTop = new THREE.LineSegments(coneEdges, coneLineMat);
        beamTop.position.set(0, 20, 0); // Offset along axis

        const beamBot = new THREE.LineSegments(coneEdges, coneLineMat);
        beamBot.rotation.x = Math.PI; // Flip
        beamBot.position.set(0, -20, 0);

        // Group beams and align with Magnetic Axis
        this.beamSystem = new THREE.Group();
        this.beamSystem.add(beamTop);
        this.beamSystem.add(beamBot);

        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), mDir);
        this.beamSystem.applyQuaternion(quaternion);

        this.rotatingSystem.add(this.beamSystem);

        this.group.add(this.rotatingSystem);
        this.group.add(this.wArrow); // Rotation vector stays fixed in space

        // Add equatorial grid to visualize rapid spin
        const ringGeom = new THREE.RingGeometry(11, 14, 32);
        const ringEdges = new THREE.EdgesGeometry(ringGeom);
        const ring = new THREE.LineSegments(ringEdges, new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.5 }));
        ring.rotation.x = Math.PI / 2;
        this.rotatingSystem.add(ring);

        // Tilt the whole setup slightly for a better camera angle
        this.group.rotation.x = 0.2;
        this.group.rotation.z = -0.1;

        scene.add(this.group);
    }

    update(time) {
        // Extreme rotation to represent K_rot = 1/2 I w^2
        const omega = 10; // rad/s (visual speed)
        this.rotatingSystem.rotation.y = time * omega;
    }
}
