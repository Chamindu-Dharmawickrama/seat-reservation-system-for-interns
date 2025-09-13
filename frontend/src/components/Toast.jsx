import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

//Toast - used to display success, error msg

const Toast = ({ message, type = "info", duration = 4000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    //change the icon according to the state
    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle className="w-5 h-5" />;
            case "error":
                return <AlertCircle className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    //change the color according to the state
    const getStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-50 border-green-200 text-green-800";
            case "error":
                return "bg-red-50 border-red-200 text-red-800 font-bold";
            default:
                return "bg-blue-50 border-blue-200 text-blue-800";
        }
    };

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-5 border rounded-lg  transition-all duration-300 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
            } ${getStyles()}`}
        >
            <div className="flex items-center space-x-3">
                {getIcon()}
                <span className="text-[18px] font-medium">{message}</span>
                <button
                    onClick={handleClose}
                    className="ml-auto hover:opacity-70 transition-opacity"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

// Hook to manage toasts
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = "info", duration = 3000) => {
        const id = Date.now() + Math.random();
        const newToast = { id, message, type, duration };
        setToasts((prev) => [...prev, newToast]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const showSuccess = (message) => addToast(message, "success",5000);
    const showError = (message) => addToast(message, "error",5000);
    const showInfo = (message) => addToast(message, "info",5000);

    return {
        toasts,
        removeToast,
        showSuccess,
        showError,
        showInfo,
    };
};

export { ToastContainer };
export default Toast;
