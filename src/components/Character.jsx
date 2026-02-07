import React, { useRef, useEffect } from 'react';
import { useCharacterStore } from '../store/useCharacterStore';
import { useFBX, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Character() {
    const group = useRef();

    const character = useFBX('/models/Character.fbx');

    const idleFBX = useFBX('/models/Idle.fbx');
    const walkFBX = useFBX('/models/Walking.fbx');
    const jumpFBX = useFBX('/models/Jumping.fbx');
    const sitFBX = useFBX('/models/Sitting.fbx');

    idleFBX.animations[0].name = 'Idle';
    walkFBX.animations[0].name = 'Walk';
    jumpFBX.animations[0].name = 'Jump';
    sitFBX.animations[0].name = 'sit';

    const { actions } = useAnimations(
        [idleFBX.animations[0], walkFBX.animations[0], jumpFBX.animations[0], sitFBX.animations[0]], group
    );

    const currentAction = useCharacterStore((s) => s.currentAction);
    const pos = useCharacterStore((s) => s.position);

    useEffect(() => {
        Object.values(actions).forEach((action) => action.stop());
        
        if(actions[currentAction.charAt(0).toUpperCase() + currentAction.slice(1)]) {
            actions[currentAction.charAt(0).toUpperCase() + currentAction.slice(1)].reset().fadeIn(0.2).play();
        }
    }, [currentAction, actions]);

    // useFrame(() => {
    //     if (!group.current) return;

    //     if (currentAction === 'Walk') {
    //         group.current.position.z = -0.5;
    //     }
    //     group.current.position.x = pos[0];
    //     group.current.position.y = pos[1];
    //     group.current.position.z = pos[2];
    // });

    return(
        <group ref={group}
         position={[pos[0], pos[1], pos[2]]} 
         scale={0.01}>
            <primitive  object={character} />
        </group>
    )
};