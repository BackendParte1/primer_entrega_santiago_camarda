

import express from "express";
import productRoutes from "./src/routes/products_routes.js";
import cartsRoutes from "./src/routes/carts_routes.js";

import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";
import viewsRouter from "./src/routes/views.router.js";
import ProductManager from "./src/controllers/ProductManager.js";

const app=express();
const server=http.createServer(app);
const io=new Server(server);
const productManajer=new ProductManager("./src/data/products.json");
//handleBars
app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views","./src/views");

//habilitamos la carpeta public
app.use(express.static("public"));

const PORT=3000;
//habilitamo para recibir json
app.use(express.json());

//enpoints
app.use("/api/products",productRoutes);
app.use("/api/carts",cartsRoutes);
app.use("/",viewsRouter);


//WebSockets
io.on("connection",(socket)=>{
    console.log("Nuevo usuario conectado");

    //agregar producto
    socket.on("newProduct",async(prouctData)=>{
        try{
            const newPoroduct=await productManajer.postProduct(prouctData);
            io.emit("productAdded",newPoroduct);
        }catch(error)
        {
            console.log("erro al añadir nuevo producto");
        }
    });

    socket.on("deleteProduct",async(productData)=>{
        try {
            //hasat aca bien
            const deleteProductId=await productManajer.deleteProductById(productData.id);
           
            if(deleteProductId===null)
            {
                console.log("producto no encotrado");

            }

            io.emit("productDeleted",deleteProductId);
        } catch (error) {
            console.log("error al eliminar el producto");
        }
    })
})

server.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})


export default app;