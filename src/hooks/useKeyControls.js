import { useCharacterStore } from "../store/useCharacterStore.js";
import { useEffect } from "react";
import { useRef } from "react";


export default function useKeyControls() {
    const setAction = useCharacterStore((s) => s.setAction);
    const setPosition = useCharacterStore((s) => s.setPosition);

    const speed = useCharacterStore((s) => s.speed);

    const isJumping = useCharacterStore((s) => s.isJumping);
    const setIsJumping = useCharacterStore((s) => s.setIsJumping);

    const keysPressed = useRef(new Set());

    useEffect(() => {
        function onKeyDown(event) {
            if (keysPressed.current.has(event.key)) return;

            keysPressed.current.add(event.key);

            //if (event.key === "1") setAction('idle');
            //if (event.key === "2") setAction('walk');
            if (event.key === " " && !isJumping) {
                setAction('jump');
                setIsJumping(true);
                return;
            }
            //if (event.key === "4") setAction('sit');
        

            setPosition((pos) => {
                const [x, y, z] = pos;
                if (event.key === "w") {
                    setAction('walk')
                    return [x, y ,z - speed];
                }

                if (event.key === "s") {
                    setAction('walk')
                    return [x, y ,z + speed];
                }

                if (event.key === "a") {
                    setAction('walk')
                    return [x - speed, y ,z];
                }

                if (event.key === "d") {
                    setAction('walk')
                    return [x + speed, y ,z];
                }
                return pos;
            })
        };

        function onKeyUp (event) {
            if (keysPressed.current.delete(event.key))
            if (["w", "a", "s", "d"].includes(event.key)) {
                if (!isJumping)
                    setAction('idle');
                    //setIsJumping(false);
            }
        };



        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keydoup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            keysPressed.current.clear();
        }
    }, [setAction, setPosition, speed, isJumping, setIsJumping]);
}