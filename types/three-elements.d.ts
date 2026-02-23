import { ThreeElements } from "@react-three/fiber";

declare module "@react-three/fiber" {
    interface ThreeElements {
        mesh: THREE.Mesh;
        planeGeometry: THREE.PlaneGeometry;
        shaderMaterial: THREE.ShaderMaterial;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            mesh: ThreeElements['mesh'];
            planeGeometry: ThreeElements['planeGeometry'];
            shaderMaterial: ThreeElements['shaderMaterial'];
        }
    }
}
