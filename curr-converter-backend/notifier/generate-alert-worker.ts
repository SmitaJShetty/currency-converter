import {UserPrefDataStore, UserAlertDataStore, UserDataStore} from '../data_store/data_store.ts';
import {UserPreference, Frequency, AlertType, User, UserAlert} from './types.ts';
import config from './config.js';
import {StockDataStore} from '../data_store/data_store.ts';

const ds=UserPrefDataStore;

//creates an alert from arguments
const generateAlertBody = (userPref:UserPreference) =>{
    const Recipient=userPref.Email;
    const StockSymbol=userPref.Stock;
    const body=config.EMAIL.BODY_TEMPLATE.replace("<RecipientName>",Recipient).replace("<StockSymbol>",StockSymbol);
    return body;
}

//saves alert to be sent out for user
async function saveAlert(stockSymbol:string, userPref:UserPreference){
    const userAlert:UserAlert={
        Sent: false,
        AlertBody: generateAlertBody(userPref),
        Recipient: userPref.Email,
        From: config.EMAIL.FROM,
        Subject:  config.EMAIL.SUBJECT_TEMPLATE,
        AlertType: userPref.AlertType,
        Frequency: userPref.Frequency,
    }
    await UserAlertDataStore.Save(userAlert);
}

const StartAlertGenerationService = async()=>{
    const allUsers:User[]|null=await UserDataStore.GetAll(); 
     if (allUsers === undefined || allUsers ===null || (allUsers && allUsers.length === 0)){
         return new Error("no user preferences were found");
     }

     for await(let user of allUsers) {
        if (user === undefined){
            return new Error("user was undefined");
        }
        
        const userPrefs:UserPreference[]=await UserPrefDataStore.GetByUserId(user.Id);
        userPrefs.forEach(userPref => { 
            const freq = userPref.Frequency;
            switch(freq){
                case Frequency.Daily: 
                    createDailyAlert(userPref);
                    break;
            }
        });
     };
}

//create daily alert fora given userpref
const createDailyAlert = async(userPref:UserPreference) =>{    
    //check redis for current stockprice
    const currentPrice:Number= await StockDataStore.getCurrentStockPrice(userPref.Stock);
    console.log("currentPrice:",currentPrice);

    if ((currentPrice>=userPref.PriceRangeFrom) && (currentPrice<=userPref.PriceRangeTo)){
        await saveAlert(userPref.Stock, userPref);
        console.log("alert saved");
        const stockSymbol = userPref.Stock;
        console.log(`daily alert created for ${currentPrice} for symbol ${stockSymbol}`);
    }
}

export {StartAlertGenerationService};

