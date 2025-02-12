const socket=io();

const formNewProduct=document.getElementById("formNewProduct");

formNewProduct.addEventListener("submit",(event)=>{
    event.preventDefault();

    const formData= new FormData(formNewProduct);
    const productData={};

    formData.forEach((value,key)=>{
        productData[key]=value;//contruyendo el onjeto , primero declaramo el nombre de la propiedad que tenemos , name:electrodomestico . en un array de objeto
    });

    socket.emit("newProduct",productData);
});


socket.on("productAdded",(newPoroduct)=>{
    const productList=document.getElementById("productsList");
    productList.innerHTML+=`<li>${newPoroduct.name}-${newPoroduct.price}</li>`

})