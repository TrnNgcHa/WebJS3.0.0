import express from "express";
import cors from "cors";
import laptopRoutes from "./routes/laptopRoutes.js";
import cpuRoutes from "./routes/cpuRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/laptops", laptopRoutes);
app.use("/api/cpus", cpuRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
