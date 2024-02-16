const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.type === "CastError") {
        const message = `Resource not found. Invalid:${err.path}`;
        err.message = message;
        err.statusCode = 404; // Assuming 404 for CastError, you can adjust as needed
    }

    res.status(err.statusCode).json({
        statusCode:err.statusCode,
        success:false,
        message: err.message,
    });

    next(err); // Pass the error to the next middleware in the stack
};

export { errorMiddleware };
