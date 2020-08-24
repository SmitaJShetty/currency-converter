import config from './configglobal.fetch = require('node-fetch');';

const getAPIData = async(externalAPIURL, base, dest, baseValue) => {

    fetch(externalAPIURL)
        .then((result)=>{
            result.json();
        })
        .then((result)=>{
           return calculateConversion(result.rates[dest], baseValue);
        })
        .catch(err =>{
            console.log(err);
            return new Error("Error encountered in getAPIData", err);
        })
}

const calculateConversion = async (conversionMultiplier, baseValue) =>{
    return conversionMultiplier * baseValue
}