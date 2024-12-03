const axios = require('axios')

async function PlaceOrdersByAPi (params) {

    axios.get("http://localhost:5800",{
    //  "account" : params.account,
    //     "password" : params.password,
    //     "server" : params.server,
        "symbol" : params.symbol,
        "type": params.orderType,
        "volume" : params.volume
        
    }).then((response)=>{
        console.log('OrderSuccssFully' , response.data);
        
    }).catch((error)=> console.log(error)
    )
    
}


module.exports = {PlaceOrdersByAPi}