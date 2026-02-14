import { rotate } from 'three/tsl';
import { create } from 'zustand';

export const useCharacterStore = create((set) => ({
    currentAction: 'idle',
    setAction: (actionName) => set(() => ({
    currentAction: actionName })),

    speed: 1.5,
    setSpeed: (value) => set(() => ({ speed: value })),

    position: [0, 0, 0], 
    setPosition: (pos) => set((state) => ({
        position: typeof pos === 'function' ? pos(state.position) : pos
    })),

    rotation: Math.PI, 
    setRotation: (value) => set({ rotation: value }),

    isJumping: false,
    setIsJumping: (value) => set(() => ({ isJumping: value })),
}));