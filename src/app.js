
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import User from "./models/UserModel.js";

import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import rateLimit from "express-rate-limit";

dotenv.config();



const app = express();


app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20
});

app.use("/api/content/live", limiter);

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected ");

    await sequelize.sync(); 

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Server error:", err);
  }
};

startServer();