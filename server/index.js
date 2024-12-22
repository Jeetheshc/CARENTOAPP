
import express from "express";
import { connectDB } from "./config/db.js"; // MongoDB connection file
import { apiRouter } from './routes/index.js';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors' ;
dotenv.config();

const app = express();
const port = 3001;

// Connect to MongoDB
connectDB();

// Middleware1
app.use(express.json());
// CORS middleware setup
app.use(
    cors({
        origin: ["http://localhost:5173", "https://carentoapp.vercel.app"],
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    })
);

// Test route to verify CORS headers
app.get('/test', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://carentoapp.vercel.app");
    res.json({ message: "CORS test successful" });
});

// Main API Route
app.use('/api', apiRouter);

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Car rent App Home page");
});
// Main API Route
app.use('/api', apiRouter);

// Catch-All Route for Undefined Endpoints
app.all("*", (req, res) => {
    res.status(404).json({ message: "Endpoint does not exist" });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
if (!process.env.JWT_SECRET) {
    console.error("Error: JWT_SECRET is not set");
    process.exit(1); // Exit the process if JWT_SECRET is missing
  }
