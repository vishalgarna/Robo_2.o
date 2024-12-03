const mongoose = require('mongoose');
const {StrategiesModel} = require('../models/Strategies.Model');
const { stopScheduling , startShceduling } = require('../mainServices/SchdeulingTasks');


url1 = "mongodb+srv://vishalgarna:vishalgarna%401@cluster0.uxsnu.mongodb.net/UserAndStrategies"
url2 = "mongodb+srv://vishalgarna:vishalgarna%401@userinfo.oup8e.mongodb.net/forexData"


// ye first wala db to strategies ko aur users ki information ko store karega 
const db1 = mongoose.connect(url1).then(() => {
    console.log('Db Is Connected [user wala]');
    watchStrategiesCollection();

}).catch((error)=>console.log(`Error in DB1 ${error}`)
)


// second db connection
const db2 = mongoose.connect(url2).then((response)=>{

    console.log('DB is conected [data store karne wala ]');
    
}).catch((error)=>{
    console.log(`Error in DB2 ${error}`);
    
})


const watchStrategiesCollection = ()=>{

    const cngstream = StrategiesModel.watch();
   cngstream.on('change' , (change)=>{
    
    if(change.operationType === 'insert'){
        startShceduling();
        console.log('new stratwegies is inserted ');
        
    }  
   })
    
}

const checkStrategies = ()=>{

    const getdocumeny = StrategiesModel.countDocuments();

    if(getdocumeny <=1 ){

        stopScheduling();
    }
}

module.exports = {
    db1,
    db2,
    checkStrategies,
    watchStrategiesCollection
}