import Reaact from 'react';
import { Canvas } from '@react-three/fiber';

function Box() {
    return(
        <mesh rotation={[0.4, 0.2, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
        </mesh>
    )
}

export default function ThreeScene() {
    return(
        <Canvas style={{ height: 400 }}>
            <ambientLight />
            <pointLight posotion={[10, 10, 10]} />
            <Box />
        </Canvas>
    )

}