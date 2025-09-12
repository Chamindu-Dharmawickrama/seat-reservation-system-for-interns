// success response
export const successResponse = (
    res,
    message = "Success",
    data,
    statusCode = 200
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
    });
};

// error response
export const errorResponse = (
    res,
    message = "Internal Server Error",
    errors = null,
    statusCode = 500
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
        timestamp: new Date().toISOString(),
    });
};
