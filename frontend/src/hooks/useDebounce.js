import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
    // set the debounced searchTerm
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // after milisecond the search value set
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // cleanup old timeout
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
