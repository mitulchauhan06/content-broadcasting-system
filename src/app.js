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
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20 
});

app.use("/api/content/live", limiter);


// app.use((req, res, next) => {
//   console.log("🌍 GLOBAL REQUEST:", req.method, req.url);
//   next();
// });




app.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.send("OK");
});

app.use(cors());
app.use(express.json());




app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);





app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});


process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT ERROR:", err);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION:", err);
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected ✅");

    await sequelize.sync();
   

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error(" Server startup error:", err);
  }
};

startServer();