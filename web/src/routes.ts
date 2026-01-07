import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("products", "routes/Products.tsx"),
  route("products/:id", "routes/ProductDetail.tsx"),
  route("contact", "routes/Contact.tsx"),
  route("login", "routes/auth/Login.tsx"),
  route("register", "routes/auth/Register.tsx"),
] satisfies RouteConfig;
