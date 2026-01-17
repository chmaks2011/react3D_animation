import Reaact from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import Character from './Character.jsx';
import useKeyControls from '../hooks/useKeyControls.JS';

export default function ThreeScene() {
    useKeyControls();

    return (
        <Canvas style={{ height: 400 }}>
            <ambientLight />
            <pointLight posotion={[10, 10, 10]} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
           
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="lightgrey" />
            </mesh>

            <Character />


            {/* Координатні осі */}
            <primitive object={new THREE.AxesHelper(2)} />
            {/* Сітка як орієнтир */}
            <primitive object={new THREE.GridHelper(10, 10)} />
            < OrbitControls />
        </Canvas>
    )

}