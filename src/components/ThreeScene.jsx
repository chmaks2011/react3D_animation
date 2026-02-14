import Reaact, { useRef }  from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import Character from './Character.jsx';
import useKeyControls from '../hooks/useKeyControls.JS';
import { useCharacterStore } from '../store/useCharacterStore.js';

function FollowCamera(){
    const cameraRef = useRef(); 
    const pos = useCharacterStore((s) => s.position);

    useFrame(({ camera }) => {
        const cameraOffset = new THREE.Vector3(0, 2.5, 3);
        const NewCameraPosition = new THREE.Vector3(
            pos[0] + cameraOffset.x,
            pos[1] + cameraOffset.y,
            pos[2] + cameraOffset.z
        );

        camera.position.lerp(NewCameraPosition, 0.1) //плавне переміщення

        camera.lookAt(pos[0], pos[1] + 1, pos[2]); //дивитися на рівні голови
    });

    return null;
}

export default function ThreeScene() {
    useKeyControls();

    return (
        <Canvas style={{ height: 600 }}
                camera={{
                    position: [0, 2.5, 3],
                    fov: 75,
                }}
            >
            <ambientLight />
            <pointLight posotion={[10, 10, 10]} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
           
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="lightgrey" />
            </mesh>

            <Character />


            {/* Координатні осі */}
            {/* <primitive object={new THREE.AxesHelper(2)} /> */}
            {/* Сітка як орієнтир */}
            {/* <primitive object={new THREE.GridHelper(10, 10)} /> */}
            {/* < OrbitControls /> */}
            <FollowCamera /> 
        </Canvas>
    )

}