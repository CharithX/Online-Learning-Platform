// Import required modules
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.user.route.js"
import adminRoutes from "./routes/auth.admin.route.js";
import cookieParser from "cookie-parser";
const cors = require("cors");
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use(cookieParser());

// Define routes
app.get("/", (req, res) => {
  res.send("API is Working ");
});
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

const url = process.env.DATABASE_URL;

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(url);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");
  } finally {
    // Close the connection
    await client.close();
  }
} 
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,  async() => { 
  console.log(`Server is running on port ${PORT}`);
  await connectToMongoDB(); 
});
