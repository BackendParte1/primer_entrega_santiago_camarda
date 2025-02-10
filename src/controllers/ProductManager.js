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


}




//addProduct

//setProductById


//deleteProductById



export default ProductManager;