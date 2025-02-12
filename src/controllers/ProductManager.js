import fs from "fs/promises";
import { get } from "http";
import { json } from "stream/consumers";



class ProductManager{
constructor(pathFile){
    this.pathFile=pathFile;
}

//get Products
getProducts=async()=>{
    try
    {
        //leemos el contendido de nuestro archivo y lo guardamos
        const data= await fs.readFile(this.pathFile,"utf-8");
        console.log(data);
        return JSON.parse(data);//parse the data to json
        
    }
    catch(err){
        console.log("erorr al leer");
        return[];
    }
   

}


getProductsById= async(id)=>{
    try
    {
        const data=await this.getProducts();
        const product=data.filter(p=>p.id==id);
        return product || null;

    }
    catch(erorr){
        console.log("error al leer");
        return null;

    }
}

postProduct=async(product)=>{
    try{
        const data=await this.getProducts();//obtener los productos existentes
        
       
        data.push(product);//agregar el producto

        await fs.writeFile(this.pathFile,JSON.stringify(data,null,2));
       return product;
        
    }
    catch(erorr){
        console.log("error al escrir");
        return null;
    }
}

putProduct = async(id,updatedFields)=>{
    try{
        const productsData =await this.getProducts();
       const index=productsData.findIndex(p=>p.id===id);
        if(index===-1)
        {
           console.log("producto no encotrado");
           return null;
        }

        productsData[index]={...productsData[index],...updatedFields};


       await fs.writeFile(this.pathFile,JSON.stringify(productsData,null,2));

       return productsData[index];

    }
    catch(erorr){
        console.log("eroor");
        return null;
    }
}

deleteProductById=async(id)=>{
    try{
        const productsData=await this.getProducts();
        const index=productsData.findIndex(p=>p.id===id);//podria hacer una funcio que encuentra un producto ya que la uso varias veces

        if(index===-1)
        {
            console.log("producto no encontrado");
            return null;
        }

        
    const updateProducts=productsData.filter(p=>p.id!==id);

    await fs.writeFile(this.pathFile,JSON.stringify(updateProducts,null,2));
    console.log("producto agregado correctamente");
    return true;






    }catch(error)
    {
        console.log("error al agregar el product");
        return false;
    }
}
}




//addProduct

//setProductById


//deleteProductById



export default ProductManager;