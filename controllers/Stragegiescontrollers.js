const stragegiesServices = require('../apiServices/Stargegies.services')
const EvaluteFun = require('../mainServices/EvaluteFuntions')

exports.create = (req, res, next) => {
    console.log(req.body.indicators[0].parameters);
    console.log(req.body.indicators[1].parameters);

    const params = {
        userId: req.body.userId,
        strategyName: req.body.strategyName,
        description: req.body.description,
        deployed: req.body.deployed,
        indicators: req.body.indicators,
        rules: req.body.rules
    };

    res.send('jai shree rma')
    // Uncomment and replace `stragegiesServices.CreateStagegies` with actual function call
    // stragegiesServices.CreateStagegies(params, (err, response) => {
    //     if (err) {
    //         // Send error response only once
    //         if (!res.headersSent) {
    //             return res.status(402).send({ message: err });
    //         }
    //     } else {
    //         // Trigger EvaluteFunction if necessary and send success response
    //         if (!res.headersSent) {
    //             EvaluteFun.EvaluteStrategy();
    //             return res.status(200).send({
    //                 message: 200,
    //                 data: response
    //             });
    //         }
    //     }
    // });
};


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