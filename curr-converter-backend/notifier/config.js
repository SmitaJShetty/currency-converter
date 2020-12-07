const config={
    STOCKPRICE_TAG:"stockprice_tag",
    EMAIL:
    {
        BODY_TEMPLATE:`Hello <RecipientName>, \n
                 this is template body.`,
        SUBJECT_TEMPLATE:`Notification alert for stock <StockSymbol>`,
        FROM:"testfrom@test.com",
    },
    Twilio_Api_key: "SG.bpuCOc0zEQl2OTO86TfVwbg.vVbvDNGjdcTcdLHdviWJnhd9NX2yEEv-cOD8C8nsdeI"
}

export default config;