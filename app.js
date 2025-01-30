

import express from "express";
import productRoutes from "./src/routes/products_routes.js";
import cartsRoutes from "./src/routes/carts_routes.js";


const app=express();
app.use(express.json());


app.use("/api/products",productRoutes);
app.use("/api/carts",cartsRoutes);


export default app;