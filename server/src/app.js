import express from "express";
import cors from "cors";
import laptopRoutes from "./routes/laptopRoutes.js";
import cpuRoutes from "./routes/cpuRoutes.js";
import gpuRoutes from "./routes/gpuRoutes.js";
import ramRoutes from "./routes/ramRoutes.js";
import storageRoutes from "./routes/storageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/laptops", laptopRoutes);
app.use("/api/cpus", cpuRoutes);
app.use("/api/gpus", gpuRoutes);
app.use("/api/rams", ramRoutes);
app.use("/api/storages", storageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
