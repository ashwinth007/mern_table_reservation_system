class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.error("🔥 Error:", err); 

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default ErrorHandler;