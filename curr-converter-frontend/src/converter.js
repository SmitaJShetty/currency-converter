import React,{useState, useEffect} from 'react';
import getRates from './api/api.js';
import getCurrencySign from './api/currency_sign.js';
import './styles.css';
import IsNullOrUndefined from './util.js';

const config = {url : "http://localhost:4000/symbols"}

export default function Converter(){
    const [currencyRates, setCurrencyRates]= useState(null);
    const [fromSymbolCode, setFromSymbolCode]  = useState(null);
    const [toSymbolCode, setToSymbolCode] = useState(null); 
    const [fromValue, setFromValue] = useState(null);
    const [result, setResult] = useState(0);

    useEffect(()=>{
        const fetchData = async() =>{ 
            let rates = currencyRates;

            if (IsNullOrUndefined(currencyRates)){
                rates= await getRates(config.url); 
                setFromSymbolCode(rates.entries().next().value[0]);
                setToSymbolCode(rates.entries().next().value[0]);
            }
            setCurrencyRates(rates); 
            
            if (IsNullOrUndefined(fromSymbolCode)){
                 setFromSymbolCode(fromSymbolCode);
            }

            if (IsNullOrUndefined(toSymbolCode)){
                setToSymbolCode(toSymbolCode);
           }
        };
        fetchData(); 
    }, [currencyRates, fromSymbolCode, toSymbolCode]);

    const onConvertClicked= (currencyRates, fromValue, fromSymbolCode, toSymbolCode, setResult, setCurrencyRates)=>{
        console.log('onConvertClicked: toSymbolCode:',toSymbolCode,'fromSymbolCode:',fromSymbolCode);
        if(!IsNullOrUndefined(currencyRates)){
            setCurrencyRates(currencyRates);
        } 

        const result = getConversion(currencyRates,fromValue, fromSymbolCode, toSymbolCode);
        console.log("result:", result);
        if (!IsNullOrUndefined(result)){ 
            setResult(result);
        }
    }  

    return (
        <div>
            <div><FromConverter currencyRates={currencyRates} fromSymbolCode={fromSymbolCode} setFromSymbolCode={setFromSymbolCode} fromValue={fromValue} setFromValue={setFromValue}/></div>
            <div><ToConverter currencyRates={currencyRates} toSymbolCode={toSymbolCode} setToSymbolCode={setToSymbolCode} result={result}/></div>
            <div><ConvertButton currencyRates={currencyRates} fromValue={fromValue} fromSymbolCode={fromSymbolCode} toSymbolCode={toSymbolCode} setResult={setResult} setCurrencyRates={setCurrencyRates} onConvertClicked={onConvertClicked}/></div>
        </div>
    )
}

  const FromConverter = ({currencyRates, fromSymbolCode, setFromSymbolCode, fromValue, setFromValue}) => {
    console.log("FromConverter, fromSymbolCode",fromSymbolCode, "fromValue", fromValue);
    const symbol= fromSymbolCode ? fromSymbolCode: currencyRates && currencyRates.keys().next().value;
    const sign = getCurrencySign(symbol);
    
    return <label>
            <span className="sign">{sign}</span>
            <span><select onChange={e=>{setFromSymbolCode(e.target.value)}}> 
                {currencyRates && Array.from(currencyRates.keys()).map((k,v) => { 
                    return <option key={k}>{k}</option>
                }) }
                </select></span>
            <input type='Number' onChange={e =>setFromValue(e.target.value)} defaultValue={fromSymbolCode} value={fromValue}></input>   
        </label>
  }
  
  const ToConverter = ({currencyRates, toSymbolCode, setToSymbolCode, result}) => {
    const symbol= toSymbolCode? toSymbolCode: currencyRates && currencyRates.keys().next().value;
    const sign= getCurrencySign(symbol);

    return( 
            <label>
                <span className="sign">{sign}</span>
                <span><select onChange={(e)=>{setToSymbolCode(e.target.value)}} >
                    { !IsNullOrUndefined(currencyRates) && Array.from(currencyRates.keys()).map((k,v) => { 
                        return <option key={k}>{k}</option>
                    })}
                    </select></span>
                    <span>{result}</span>
            </label>
        );
    }

  const ConvertButton = ({currencyRates,fromValue,fromSymbolCode,toSymbolCode,setResult,setCurrencyRates,onConvertClicked}) => {
      console.log('ConvertButton, fromValue',fromValue);
        return (
                <button className="btn" onClick={e=>onConvertClicked(currencyRates,fromValue, fromSymbolCode, toSymbolCode,setResult,setCurrencyRates)}>Convert</button>
            );
   }

  const getConversion = (rates, fromValue, fromSymbolCode, toSymbolCode) => {
      console.log('getConversion:', fromValue,fromSymbolCode, toSymbolCode);

      let result = null;
      result=rates.get(toSymbolCode)/rates.get(fromSymbolCode) * fromValue;

      console.log(result);
      return result;
  }