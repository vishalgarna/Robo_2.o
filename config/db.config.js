const mongoose = require('mongoose');
const {StrategiesModel} = require('../models/Strategies.Model');
const { stopScheduling , startShceduling } = require('../mainServices/SchdeulingTasks');
const {EvaluteStrategy} = require ('../mainServices/EvaluteStrategies')

url = "mongodb+srv://vishalgarna:vishalgarna%401@cluster0.uxsnu.mongodb.net/Algo-backend"


const db = mongoose.connect(url).then(() => {
    console.log('Db Is Connected');
    watchStrategiesCollection();

}).catch((error)=>console.log(error)
)


const watchStrategiesCollection = ()=>{

    const cngstream = StrategiesModel.watch();
   cngstream.on('change' , (change)=>{
    
    if(change.type == 'insert'){
        startShceduling();
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
    db,
    checkStrategies,
    watchStrategiesCollection
}