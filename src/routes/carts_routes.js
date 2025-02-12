import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartRouter = Router();

// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await CartManager.createCart();
        if (!newCart) {
            return res.status(500).json({ message: "Error al crear el carrito" });
        }
        res.status(201).json(newCart);
    } catch (error) {
        console.error("Error en POST /cart:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener todos los carritos
cartRouter.get("/", async (req, res) => {
    try {
        const carts = await CartManager.getCarts();
        res.json(carts);
    } catch (error) {
        console.error("Error en GET /cart:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener un carrito por ID
cartRouter.get("/:id", async (req, res) => {
    try {
        const cartId = parseInt(req.params.id);
        const cart = await CartManager.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.json(cart);
    } catch (error) {
        console.error("Error en GET /cart/:id:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Agregar un producto a un carrito
cartRouter.post("/:id/products/:productId", async (req, res) => {
    try {
        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.params.productId);
        const { quantity } = req.body;

        const updatedCart = await CartManager.addProductToCart(cartId, productId, quantity || 1);

        if (!updatedCart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.json(updatedCart);
    } catch (error) {
        console.error("Error en POST /cart/:id/products/:productId:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

export default cartRouter;
