require('../config/db.config')
const strategiesModel = require('../models/Strategies.Model');
const EvaluteFunction = require('../Appservices/EvaluteFuntions')

async function CreateStagegies(params, callback) {

    // if (!params.userId) return callback({ message: 'Please Provide userId', })

    try {
        const newmodel = new strategiesModel(params);
        await newmodel.save().then((response) => {

            return callback(null, response);
        })
    } catch (error) {
        return callback({ message: `Error ${error}` })
    }
}
async function getStrategiesById(params, callback) {

    if(!params.id){
        return  callback({
            message : 'please provide userid '
        })
    }

    try {

        await strategiesModel.findById(params.id)
        .then((response)=>{
           
            if(response != null){
               return  callback(null, response);
            }

            return  callback({
                message : 'no Strategies are found '
            });


        })
        
    } catch (error) {
        return ({
            message : error
        })
    }
    
}


async function updateStrategy(params , callback) {

    if(!params.strategyId){
        return callback({
            message : 'please provide id for update'
        })
    }

    try {

      await strategiesModel.findByIdAndUpdate(params.strategyId,params)
      .then((response)=>{
       
        if(!response){
            return callback({
                message : 'strstegyid not found for update'
            })
        }
        return callback({
            message : 'update Succesfully'
        })
      })
        
    } catch (error) {
        return ({
            message : error
        })
    }
    
}

async function deltestrategy(params , callback) {

    if(!params.strategyId){
        return callback({
            message : 'please provide id for delte'
        })
    }

    try {

      await strategiesModel.findByIdAndDelete(params.strategyId)
      .then((response)=>{
       
        if(!response){
            return callback({
                message : 'strstegyid not found for update'
            })
        }
        return callback({
            message : 'delete Succesfully'
        })
      })
        
    } catch (error) {
        return ({
            message : error
        })
    }
    
}



module.exports = {
    CreateStagegies,
getStrategiesById,
updateStrategy,
deltestrategy
}
