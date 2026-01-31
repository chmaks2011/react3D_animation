import { useCharacterStore } from "../store/useCharacterStore.js";
import { useEffect } from "react";


export default function useKeyControls() {
    const setAction = useCharacterStore((s) => s.setAction)
    const setPosition = useCharacterStore((s) => s.setPosition)

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "1") setAction('idle');
            if (event.key === "2") setAction('walk');
            if (event.key === "3") setAction('jump');
            if (event.key === "4") setAction('sit');
        
            setPosition((pos) => {
                const [x, y, z] = pos;
                if (event.key === "w") return [x, y ,z - 0.5];
                if (event.key === "s") return [x, y ,z + 0.5];
                if (event.key === "a") return [x - 0.5, y ,z];
                if (event.key === "d") return [x + 0.5, y ,z];
                return pos;
            })
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [setAction, setPosition]);
}