const stragegiesServices = require('../apiServices/Stargegies.services')
const EvaluteFun = require('../Appservices/EvaluteFuntions')

exports.create = (req, res, next) => {

    console.log(req.body.strategyName);

    const params = {
        "userId": req.body.userId,
        "strategyName": req.body.strategyName,
        "description": req.body.description,
        "deployed": req.body.deployed,
        "indicators": req.body.indicators,
        "rules": req.body.rules

    }

    stragegiesServices.CreateStagegies(params, (err, response) => {

        if (err) {
            res.send({
                message: err,

            }).status(402)
        }

        else {

            // ye func isliye call kara kyuki kisi user ne agar stragegies banyai deploya kari hai to 
            // to evalute functiom trigger ho jaye aur evalute kare jitni bhi ho usko  evalute karne lag jaye
       
            EvaluteFun.EvaluteStrategy()

            res.status(200).send({
                message: 200,
                data: response
            })
        }
    })



}

exports.getstrateies  = (req,res, next)=> {
  const params = {
        id : req.body.userId,  
    }

    stragegiesServices.getStrategiesById(params , (err , result)=>{
        if(err){
           next(err); 
        }

        res.status(200).send({
            message : 'succes',
            data : result
        })

    })
}

exports.update  = (req,res, next)=> {
    const params = {
        "userId": req.body.strategyId,
        "strategyName": req.body.strategyName,
        "description": req.body.description,
        "deployed": req.body.deployed,
        "indicators": req.body.indicators,
        "rules": req.body.rules

      }
  
      stragegiesServices.updateStrategy(params , (err , result)=>{
          if(err){
             next(err); 
          }
  
          res.status(200).send({
              message : 'succes',
              data : result
          })
  
      })
  }


exports.delete  = (req,res, next)=> {
    const params = {
          id : req.body.strategyId,  
      }
  
      stragegiesServices.deltestrategy(params , (err , result)=>{
          if(err){
             next(err); 
          }
  
          res.status(200).send({
              message : 'succes',
              data : result
          })
  
      })
  }