import currData from './currency_signs.json';
import IsNullOrUndefined from '../util';

const getCurrencySign = (symbolCode) =>{
    const data= currData[symbolCode]; 
    if (IsNullOrUndefined(data)){
        return '!';
    }

    return data.symbol_native;
}

export default getCurrencySign;