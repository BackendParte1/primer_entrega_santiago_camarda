import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

// Obtener la ruta absoluta del archivo products.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/products.json");

// Función para leer productos desde el archivo JSON
const readProducts = () => {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error("Error leyendo el archivo:", error);
        return [];
    }
};

// Obtener todos los productos
router.get("/", (req, res) => {
    res.json(readProducts());
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
    const products = readProducts();
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

export default router;
