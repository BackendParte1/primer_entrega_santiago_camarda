# primer_entrega_santiago_camarda
/mi-proyecto
│── /src
│   ├── /routes
│   │   ├── products.routes.js
│   │   ├── carts.routes.js
│   ├── /controllers
│   │   ├── products.controller.js
│   │   ├── carts.controller.js
│   ├── /services
│   │   ├── productService.js
│   │   ├── cartService.js
│   ├── /models
│   │   ├── Product.js
│   │   ├── Cart.js
│   ├── /data
│   │   ├── products.json
│   │   ├── carts.json
│   ├── app.js
│   ├── server.js
│── package.json
│── .gitignore
│── README.md





Explicación de la estructura:
src/routes/

products.routes.js: Contiene las rutas relacionadas con los productos (/api/products).
carts.routes.js: Contiene las rutas para manejar carritos (/api/carts).
src/controllers/

products.controller.js: Maneja la lógica de los endpoints de productos.
carts.controller.js: Maneja la lógica de los endpoints de carritos.
src/services/

productService.js: Contiene la lógica de negocio y persistencia de productos.
cartService.js: Maneja la lógica de negocio y persistencia de carritos.
src/models/

Product.js: Define la estructura de un producto.
Cart.js: Define la estructura de un carrito.
src/data/

products.json: Archivo donde se almacenan los productos.
carts.json: Archivo donde se almacenan los carritos.
app.js

Configura los middleware y routers.
server.js

Arranca el servidor con Express.





1. Productos
Se puede crear, actualizar, leer y eliminar correctamente un producto mediante sus endpoints y esto se ve reflejado en ell archivo ""products.json"". Asimismo, el ""id"" del producto se genera correctamente sin duplicarse y no es posible actualizarlo mediante los servicios desarrollados.
2. Carrito
El carrito se crea correctamente con un cid único autogenerado. Se añaden sólo los IDs de los productos correctamente a un carrito específico, aumentando el campo ""quantity"" en caso de ya existir en dicho carrito. Asimísmo, cuando se consulta un carrito se visualiza un array con todos los productos añadidos al momento.
3. Persistencia de datos
Se realiza un correcto uso del módulo de FileSystem. Los archivos ""products.json"" y ""carts.json"" reflejan los cambios realizados desde los endpoints y se visualizan con un formato legible.
4. Rutas
Las rutas están separadas por sus correspondientes routers en la carpeta "src/routes/" e implementadas en el archivo main "app.js". con node cual seria la estructura inicial