interface  CurrSymbol {
    Symbol: string;
    Name: string;
}

 interface CurrencyAlertData {
    Id: string;
    CurrId: string;
    CreationDate: Date;
    UserID: string;
    Frequency: Frequency;
    RangeBeginDate: Date;
    RangeEndDate: Date;
}

interface AlertBody {
    subject: string;
    recipient: string;
    from: string;
    body: string;
}

interface Notification{
    UserId: string;
    CustomerID: string;
    SentDate: Date;
    EmailBody: string;
    Sent: Boolean;
}

enum Frequency{
    Daily,
    Weekly,
    Monthly,
    Intraday,
    Summary
}

interface UserPreference{
    _id?:{$oid:string}
    Id?:string;
    UserID: string;
    Frequency: Frequency;
    Stock:string;
    PriceRangeFrom:Number;
    PriceRangeTo:Number;
    CreatedAt: Date;
    UpdatedAt: Date;  
    DateRangeFrom: Date;
    DateRangeTo: Date;
    Email:string;
    AlertType:AlertType;
}

interface UserAlert{
    Id?: string;
    Sent: Boolean;
    AlertBody: string;
    Recipient: string;
    From: string;
    Subject:string;
    Frequency:Frequency;
    AlertType: AlertType;
}

enum AlertType{
    Email, 
    SMS,
}

interface User{
    Id:string;
    Name: string;
    Email: string;
    CreatedAt: string;
    Enabled:boolean;
}

interface AddUserPrefResquest{
    Status:Number,
    UserPref:UserPreference
}

export {AddUserPrefResquest, User, AlertType, Frequency, UserAlert, CurrencyAlertData, CurrSymbol, AlertBody, Notification, UserPreference};

/*
{
    Id:"03",
    Name: "user03",
    Email: "user03@test.com",
    CreatedAt: '2020-12-05',
    Enabled:true
}
{
    Id:"upref_01",
    UserID: "user01",
    AlertFrequency: "Daily",
    Stock: "stock01",
    PriceRangeFrom:100,
    PriceRangeTo:150,
    CreatedAt: "2020-12-03",
    UpdatedAt: "2020-12-03",
    DateRangeFrom: "2020-12-03",
    DateRangeTo: "2020-12-03",
    Email:"user01@test.com",
    AlertType:Email,
}
{
    "Id":"user01",
    "Name": "user-name",
    "Email": "user01@test.com",
    "CreatedAt": "",
    "Enabled":true
}
*/
