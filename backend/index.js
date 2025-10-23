import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import connectDB from "./database.js";
import { uploadreport, getreports } from "./reportcontrol.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:3000",   
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

connectDB();

// Multer for XML uploads
const upload = multer({ dest: "backend/uploads/" });

app.post("/api/upload", upload.single("file"), uploadreport);
app.get("/api/reports", getreports);

app.get("/", (req, res) => {
  res.send("✅ CreditSea backend running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
