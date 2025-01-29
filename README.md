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
