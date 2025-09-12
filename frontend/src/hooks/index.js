import { useState, useCallback } from "react";

// Custom hook for form state management
export const useForm = (initialValues, validationRules = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value,
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        },
        [errors]
    );

    const handleBlur = useCallback(
        (e) => {
            const { name } = e.target;
            setTouched((prev) => ({
                ...prev,
                [name]: true,
            }));

            // Validate field on blur
            if (validationRules[name]) {
                const error = validationRules[name](values[name]);
                if (error) {
                    setErrors((prev) => ({
                        ...prev,
                        [name]: error,
                    }));
                }
            }
        },
        [validationRules, values]
    );

    const validate = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach((field) => {
            const error = validationRules[field](values[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(
            Object.keys(validationRules).reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {})
        );

        return isValid;
    }, [validationRules, values]);

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    const setValue = useCallback((name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validate,
        reset,
        setValue,
        isValid: Object.keys(errors).length === 0,
        isDirty: Object.keys(touched).length > 0,
    };
};

// Custom hook for modal state
export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};

// Custom hook for async operations
export const useAsync = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (asyncFunction) => {
        try {
            setLoading(true);
            setError(null);
            const result = await asyncFunction();
            return result;
        } catch (err) {
            setError(err.message || "An error occurred");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
    }, []);

    return {
        loading,
        error,
        execute,
        reset,
    };
};

// Custom hook for local storage
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(
                    `Error setting localStorage key "${key}":`,
                    error
                );
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
};

// Validation rules for forms
export const validationRules = {
    required: (value) => {
        if (!value || (typeof value === "string" && !value.trim())) {
            return "This field is required";
        }
        return "";
    },

    email: (value) => {
        if (!value) return "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email address";
        }
        return "";
    },

    minLength: (min) => (value) => {
        if (!value) return "";
        if (value.length < min) {
            return `Must be at least ${min} characters long`;
        }
        return "";
    },

    maxLength: (max) => (value) => {
        if (!value) return "";
        if (value.length > max) {
            return `Must be no more than ${max} characters long`;
        }
        return "";
    },

    seatNumber: (value) => {
        if (!value) return "Seat number is required";
        const seatRegex = /^[A-Z]\d{2}$/;
        if (!seatRegex.test(value)) {
            return "Seat number must be in format A01, B02, etc.";
        }
        return "";
    },

    futureDate: (value) => {
        if (!value) return "";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            return "Date must be today or in the future";
        }
        return "";
    },
};
