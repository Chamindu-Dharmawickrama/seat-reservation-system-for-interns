import { Loader2 } from "lucide-react";

// loading animations

const LoadingSpinner = ({ size = "md", color = "blue", className = "" }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
    };

    const colorClasses = {
        blue: "text-blue-500",
        green: "text-green-500",
        red: "text-red-500",
        gray: "text-gray-500",
        white: "text-white",
    };

    return (
        <Loader2
            className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
        />
    );
};

const LoadingOverlay = ({ message = "Loading...", show = true }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 shadow-xl">
                <LoadingSpinner size="xl" />
                <p className="text-gray-700 font-medium">{message}</p>
            </div>
        </div>
    );
};

const LoadingCard = ({ className = "" }) => {
    return (
        <div
            className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm ${className}`}
        >
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
};

const LoadingTable = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="animate-pulse">
                {/* Header */}
                <div className="border-b border-gray-200 p-4">
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: columns }, (_, i) => (
                            <div
                                key={i}
                                className="h-4 bg-gray-200 rounded"
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Rows */}
                {Array.from({ length: rows }, (_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="border-b border-gray-100 p-4 last:border-b-0"
                    >
                        <div className="grid grid-cols-4 gap-4">
                            {Array.from({ length: columns }, (_, colIndex) => (
                                <div
                                    key={colIndex}
                                    className="h-3 bg-gray-100 rounded"
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LoadingButton = ({
    children,
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <button
            disabled={loading || disabled}
            className={`flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {loading && <LoadingSpinner size="sm" color="white" />}
            <span>{children}</span>
        </button>
    );
};

export {
    LoadingSpinner,
    LoadingOverlay,
    LoadingCard,
    LoadingTable,
    LoadingButton,
};

export default LoadingSpinner;
