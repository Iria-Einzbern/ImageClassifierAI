import { useEffect } from 'react';

export const useDebouncedEffect = (effect, delay, deps) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            effect();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, deps);
};

