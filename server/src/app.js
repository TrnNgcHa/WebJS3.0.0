const express = require("express");
const cors = require("cors");
const laptopRoutes = require("./routes/laptopRoutes");
const cpuRoutes = require("./routes/cpuRoutes");
const gpuRoutes = require("./routes/gpuRoutes");
const ramRoutes = require("./routes/ramRoutes");
const storageRoutes = require("./routes/storageRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
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

module.exports = app;
