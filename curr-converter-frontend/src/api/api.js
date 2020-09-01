import IsNullOrUndefined from '../util.js';

const getRates = async (url) => {
   if (IsNullOrUndefined(url)){
       return new Error("url is invalid");
   }

   let result = null;

   try{
    const response= await fetch(url);
    result = await response.json(); 
   } catch(err){
       throw new Error("new error:", err);
   } finally{   
       return generateMap(result.rates);
   }
}

const generateMap= (rates) => {
    let m = new Map();
    Object.entries(rates).map((k,v)=>{
       m.set(k[0],k[1]); 
    });
    return m;
}

export default getRates;