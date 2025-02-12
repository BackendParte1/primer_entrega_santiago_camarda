import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/carts.json");

class CartManager {
    constructor(filePath) {
        this.pathFile = filePath;
    }

    // Obtener todos los carritos
    getCarts = async () => {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo de carritos:", error);
            return [];
        }
    };

    // Obtener un carrito por ID
    getCartById = async (id) => {
        try {
            const carts = await this.getCarts();
            return carts.find(cart => cart.id === id) || null;
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            return null;
        }
    };

    // Crear un nuevo carrito
    createCart = async () => {
        try {
            const carts = await this.getCarts();
            const newCart = { id: Date.now(), products: [] };

            carts.push(newCart);
            await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2));

            return newCart;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            return null;
        }
    };

    // Agregar un producto a un carrito
    addProductToCart = async (cartId, productId, quantity = 1) => {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);

            if (cartIndex === -1) {
                return null; // Carrito no encontrado
            }

            const cart = carts[cartIndex];

            // Buscar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(p => p.id === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity; // Si existe, suma cantidad
            } else {
                cart.products.push({ id: productId, quantity }); // Si no, lo agrega
            }

            // Guardar cambios en el archivo
            await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2));

            return cart;
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            return null;
        }
    };
}

export default new CartManager(filePath);
