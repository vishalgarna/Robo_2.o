const stragegiesServices = require('../services/Stargegies.services')
const stragegiesEvaluteFun = require('../services/Stargegies.services')

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
       
            stragegiesEvaluteFun.EvaluteStrategy()

            res.status(200).send({
                message: 200,
                data: response
            })
        }
    })



}