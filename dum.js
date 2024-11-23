
const timeframes = ["1m" , "5m" , "15m"]

timeframes.forEach((timeframe)=>{
    const interval = timeframe === "1m" ? 60*1000 : timeframe === "5m" ? 60*5000 : 60*10000 ;
 console.log("intervsl",interval , "timeframe " ,timeframe);

 
    setInterval(()=>saveOnhlcdata(timeframe) , interval)
})

