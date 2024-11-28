const {userModel}  = require('../models/User.Model')


async function createuser(params , callback) {

    if(!params.email){
        return callback({
            message : 'email is requires'
        })
    }

    try {

        const alreadyexist = userModel.findOne({UserEmail :params.UserEmail})

        if(alreadyexist){
            return callback({
                message : 'email is already register'
            })
        }

        await UserModel(params) 
        .then((response)=>{
            if(response !=null){
                
                return callback(null, response)
            }
        })
    } catch (error) {
        
    }
    
}


async function getuserByemail(params , callback) {
    if(!params.email){
        return callback({
            message : 'email is requires'
        })
    }

    try {

        const alreadyexist = userModel.findOne({UserEmail :params.UserEmail})
        .then((response)=>{
            if(!response){
                return ({
                    message : 'user not Found'
                })

            }
        })
        
    } catch (error) {
        return ({
            message : error
        })
    }
}


async function getuserAllusers(params , callback) {

    if(!params.email){
        return callback({
            message : 'email is requires'
        })
    }

    try {

        const alreadyexist = userModel.find()
        .then((response)=>{
            if(!response){
                return ({
                    message : 'user not Found'
                })

            }
        })
        
    } catch (error) {
        return ({
            message : error
        })
    }
}


module.exports = {
    getuserAllusers,
    getuserByemail,
    createuser
}