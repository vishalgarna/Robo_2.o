const nodeSchdeular = require('node-schedule');
const {EvaluteStrategy} = require('./EvaluteStrategies');
const {checkStrategies} = require('../config/db.config')
let job;


const startShceduling = ()=>{
 if(!job){
    console.log('scheduling is strated ');

    job = nodeSchdeular.scheduleJob('*/1 * * * *',async()=>{
        await EvaluteStrategy();
        await checkStrategies();
    } )   
 }
}

const stopScheduling = ()=>{

    if(job){
        job.cancel();
        job = null;
        console.log('shcdular iss stopped');
        
    }
}

module.exports = {
    startShceduling,
    stopScheduling
}