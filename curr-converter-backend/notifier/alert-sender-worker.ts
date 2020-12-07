import {UserAlert, Frequency} from './types.ts';
import { sendMail, IRequestBody } from "https://deno.land/x/sendgrid/mod.ts";
import config from './config.js';
import {UserAlertDataStore} from '../data_store/data_store.ts'

const sendAlert = async(userAlert:UserAlert):Promise<any> => {
  let mail: IRequestBody = {
      personalizations: [
      {
          subject: userAlert.Subject,
          to: [{ name: userAlert.Recipient, email: userAlert.Recipient }],
      },
      ],
      from: { email: userAlert.Recipient },
      content: [
      { type: "text/plain", value: userAlert.AlertBody },
      { type: "text/html", value: userAlert.AlertBody },
      ],
  };

  return await sendMail(mail, { apiKey: config.Twilio_Api_key });
}

const SendDailyAlertService = async () =>{
  console.log("start send daily alert service");

  //fetch user alert not sent
  const notSentAlerts:UserAlert[]=await UserAlertDataStore.GetAllUnsent(Frequency.Daily);

  //loop through and send alerts
  for await(let userAlert of notSentAlerts){
    if (userAlert===undefined || userAlert===null){
        console.error("user alert was invalid"); return;
    }
    let alertSent = await sendAlert(userAlert); 
    console.log(alertSent);
  }
  console.log('all alert emails sent');
}

export default SendDailyAlertService;