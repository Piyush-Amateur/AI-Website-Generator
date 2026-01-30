import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import generateRoute from "./routes/generateRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

/* ===================================
   MIDDLEWARE CONFIGURATION
   =================================== */

// Security headers
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["POST", "GET"],
        credentials: true,
    })
);

// JSON body parser with size limit
app.use(express.json({ limit: "10kb" }));

// Rate limiting for API routes
app.use("/api", rateLimiter);

/* ===================================
   ROUTES
   =================================== */

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "Smart Genesis Backend"
    });
});

// Website generation endpoint
app.use("/api/generate", generateRoute);

/* ===================================
   ERROR HANDLING
   =================================== */

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(err.status || 500).json({
        error: err.message || "Internal server error",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

/* ===================================
   SERVER STARTUP
   =================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Smart Genesis Backend running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    console.log(`✅ Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
