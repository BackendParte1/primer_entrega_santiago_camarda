const socket=io();

const formNewProduct=document.getElementById("formNewProduct");


//comunica al servidor que se esta agregando un nuevo producto
formNewProduct.addEventListener("submit",(event)=>{
    event.preventDefault();

    const formData= new FormData(formNewProduct);
    const productData={};

    formData.forEach((value,key)=>{
        productData[key]=value;//contruyendo el onjeto , primero declaramo el nombre de la propiedad que tenemos , name:electrodomestico . en un array de objeto
    });

    formNewProduct.reset(); // ✅ Limpia el formulario después de enviar

    socket.emit("newProduct",productData);
});

//recibe la nueva actualizacion del servidor que agrego el producto que le habiamos mandado
socket.on("productAdded",(newPoroduct)=>{
    const productList=document.getElementById("productsList");
    productList.innerHTML+=`<li>${newPoroduct.name}-${newPoroduct.price}</li>`

})




document.addEventListener("click",(event)=>{
    if (event.target.classList.contains("delete-btn")) {
        const productId = event.target.getAttribute("data-id"); // Obtener el ID del producto
        socket.emit("deleteProduct", { id: productId }); // Enviar el ID al servidor
    }
})

socket.on("productDeleted",(deleteProductId)=>{
    const productElement=document.getElementById(`product-${deleteProductId}`);
    if(productElement)
    {
        productElement.remove();//eliminar el producto de la vista
    }
  
})