import rateLimit from "express-rate-limit";

// only 5 requests per minute from a single IP address
export const loginRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1 min
    max: 6,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after a minute.",
    },
});

export const signupRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, //5 min
    max: 3,
    message: {
        success: false,
        message: "Too many signup attempts. Please try again later",
    },
});

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //5 min
    max: 200,
    message: {
        success: false,
        message: "Too many requests from this IP. Try again later.",
    },
});
