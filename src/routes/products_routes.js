import {  Router } from "express";
import fs from "fs";
import path from "path";
import { sourceMapsEnabled } from "process";
import { fileURLToPath } from "url";
import ProductManager from "../controllers/ProductManager.js";


//instaciamos el Router de express para manejar las rutas
const productRouter = Router();
const productManager=new ProductManager("./src/data/products.json");//instancia de la clas de nuestro manejador de productos



//lo dejo pero es como lo tenia hecho antes 
// // Obtener la ruta absoluta del archivo products.json
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.join(__dirname, "./src/data/products.json");





// // Función para leer productos desde el archivo JSON
// const readProducts = () => {
//     try {
//         return JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     } catch (error) {
//         console.error("Error leyendo el archivo:", error);
//         return [];
//     }
// };





// Obtener todos los productos
productRouter.get("/", async(req, res) => {
    //lo tenia hecho asi porque no tenia product manajer
   
    // const products=readProducts();
    // //concertir limit a un numero
    // const limitedProducts=limit?products.slice(0,parseInt(limit)):products;
    // res.json(limitedProducts);//devuleve la lista de productos limitads


    
    try{
        const {limit} =req.query;//obtiene el valor de limit desde la consulta
        const data=await productManager.getProducts();

        if(limit && !isNaN(limit)){
            data=data.slice(0,parseInt(limit));
        }
        res.status(200).send(data);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"erro al obtener los productos"});
    }
});


//obtener un producto por su id 
productRouter.get("/:id",async(req,res)=>{
    // const products=readProducts();
    // const productId=parseInt(req.params.id);
    // const product=products.find(p=>p.id==productId);

    // if(product){
    //     res.json(product);
    // }else
    // {
    //     res.status(404).json({message:"producto no ecnotnrado"});
    // }

    try{
        const productId=parseInt(req.params.id);
        const productData=await productManager.getProductsById(productId);

        if(!productData){
            res.status(404).json({message:"producto no encotntrado"});
        }
        res.status(200).send(productData);
    }
    catch(erorr){
        console.log("error al obtener el products");

    }

})



// Agregar un nuevo producto
productRouter.post("/", (req, res) => {
    const products = readProducts();
    //EXTRAER LOS CAMPOS DEl body
    const {title,description,code,price,stock,thumbnails,category}=req.body;

    //validacion de los campos
    if(!title || !description || !code || !price || !stock || !category){
        return res.status(400).json({message:"faltan campos"});
    }

    //generar ID
    const newId=Date.now();
    //crear un nuevo producto
    const newProduct={
        id:newId,
        title,
        description,
        code,
        price,
        status:true,
        stock,
        thumbnails: thumbnails || []
    }
  
    products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});



//PUT "/:pid"


//Delete "/:pid"

export default productRouter;
