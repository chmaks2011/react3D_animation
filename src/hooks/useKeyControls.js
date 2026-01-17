import { useCharacterStore } from "../store/useCharacterStore.js";
import { useEffect } from "react";


export default function useKeyControls() {
    const setAction = useCharacterStore((s) => s.setAction)

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "1") setAction('idle');
            if (event.key === "2") setAction('walk');
            if (event.key === "3") setAction('jump');
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [setAction]);
}