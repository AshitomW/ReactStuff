import { useEffect } from "react";

export function useKey(Key, action) {
    useEffect(
        function () {
            function Listener(event) {
                if (event.code.toLowerCase() === Key.toLowerCase()) {
                    action();
                }
            }

            document.addEventListener("keydown", Listener);

            return function () {
                document.removeEventListener("keydown", Listener);
            };
        },
        [Key, action]
    );
}
