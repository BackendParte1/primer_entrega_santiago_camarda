import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/carts.json");

const readCarts = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2)); // Crear archivo si no existe
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

router.post("/", (req, res) => {
    const carts = readCarts();
    const newCart = { id: Date.now(), products: [] };
    carts.push(newCart);
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
});

// Obtener todos los productos
router.get("/", (req, res) => {
    res.json(readCarts());
});

export default router;
