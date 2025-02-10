

import express from "express";
import productRoutes from "./src/routes/products_routes.js";
import cartsRoutes from "./src/routes/carts_routes.js";

 
const app=express();

//habilitamo para recibir json
app.use(express.json());

//enpoints
app.use("/api/products",productRoutes);
app.use("/api/carts",cartsRoutes);


export default app;