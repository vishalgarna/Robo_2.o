
const userservices = require('../apiServices/userServices')

exports.create  = (req, res, next)=>{


    console.log(req.body);
    res.send();
    
    // const params  = {
    //     "UserName" : req.body.userName,
    //     "UserEmail" : req.body.email,
    //     "UserPassword" : req.body.pass
    // }

    // userservices.createuser(params, (err, response)=>{

    //     if(err){
    //         next(err)
    //     }

    //     res.status(200).send({
    //         message : "success",
    //         data : response  

    //     })
    // });
}

exports.getalluers = (req, res, next)=>{

    const params ={

    }
    // userservices.getuserAllusers(params , (err , response )=>{

    //     if(err){
    //         next(err)
    //     }

    //     res.status(200).send({
    //         message : "succes",
    //         data : response
    //     })
    // })

    res.send('hy aall users ar ')
}