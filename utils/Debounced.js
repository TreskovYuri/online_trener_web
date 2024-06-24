
import { useEffect } from 'react'
import { useRef } from 'react'

export const Debounced = (callback, delay=500) => {
    const timerRef = useRef(null);

    const debouncedFunction = (...args) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    return debouncedFunction;
};