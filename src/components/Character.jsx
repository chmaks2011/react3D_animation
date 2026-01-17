import React, { useRef, useEffect } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { useFBX, useAnimations } from '@react-three/drei';

export default function Character() {
    const group = useRef();

    const character = useFBX('/models/Character.fbx');

    const idleFBX = useFBX('/models/Idle.fbx');
    const walkFBX = useFBX('/models/Walking.fbx');
    const jumpFBX = useFBX('/models/Jumping.fbx');

    idleFBX.animations[0].name = 'Idle';
    walkFBX.animations[0].name = 'Walk';
    jumpFBX.animations[0].name = 'Jump';

    const { actions } = useAnimations(
        [idleFBX.animations[0], walkFBX.animations[0], jumpFBX.animations[0]], group
    );

    const currentAction = useCharacterStore((s) => s.currentAction);

    useEffect(() => {
        Object.values(actions).forEach((action) => action.stop());
        
        if(actions[currentAction.charAt(0).toUpperCase() + currentAction.slice(1)]) {
            actions[currentAction.charAt(0).toUpperCase() + currentAction.slice(1)].reset().fadeIn(0.2).play();
        }
    }, [currentAction, actions]);

    return(
        <group ref={group} position={[0, 0, 0]} scale={0.01}>
            <primitive  object={character} />
        </group>
    )
};

