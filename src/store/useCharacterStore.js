import { create } from 'zustand';

export const useCharacterStore = create((set) => ({
    currentAction: 'idle',
    setAction: (ActionName) => set(() => ({
    currentAction: ActionName })),
    speed: 1.5,
    setSpeed: (value) => set(() => ({ speed: value }))
}));


