import { create } from 'zustand';

export const useCharacterStore = create((set) => ({
    currentAction: 'idle',
    setAction: (actionName) => set(() => ({
    currentAction: actionName })),
    speed: 1.5,
    setSpeed: (value) => set(() => ({ speed: value }))
}));


