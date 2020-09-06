import {ServerRequest} from 'https://deno.land/std/http/server.ts';
import config from './config.js';
import * as util from './util.js';

export const getConversion = async (ctx:any):Promise<any> =>{    
    const request = ctx.request;
    
    //validate request
    const fromSymbol = ctx.params && ctx.params.from;
    const toSymbol = ctx.params && ctx.params.to;

    if (util.isNullOrUndefined(fromSymbol) || util.isNullOrUndefined(toSymbol)){
        throw new Error("invalid parameters");
    }

    //invoke external api
    if (util.isNullOrUndefined(config.ExternalAPIURL)){
        throw new Error("invalid externalAPIURL");
    }

    let response, result = null;
    try {
        response = await fetch(config.ExternalAPIURL);
        result = await response.json(); console.log(result);
    }
    catch(err){
        console.log("err:", err)
        return err;
    }

    ctx.response.body=result;
}

export const getAllSymbols = async(ctx:any):Promise<any> => {
    //invoke external api
    let response, result = null;
    try {
        response = await fetch(config.LoadSymbolsURL);
        result = await response.json();
    }
    catch(err){
        console.log("err:", err)
        return err;
    }
    
    ctx.response.body = result;
}

const handlers = {
    getAllSymbols,
    getConversion
};
export default handlers;