import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("products", "routes/Products.tsx"),
  route("products/laptop/:id", "routes/LaptopDetail.tsx"),
  route("products/cpu/:id", "routes/CpuDetail.tsx"),
  route("products/storage/:id", "routes/StorageDetail.tsx"),
  route("products/ram/:id", "routes/RamDetail.tsx"),
  route("products/gpu/:id", "routes/GpuDetail.tsx"),
  route("contact", "routes/Contact.tsx"),
  route("login", "routes/auth/Login.tsx"),
  route("register", "routes/auth/Register.tsx"),
] satisfies RouteConfig;
