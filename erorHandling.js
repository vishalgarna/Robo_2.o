
async function errorhandling(err , req, res ,next ) {

    err.message = err.message || 'server error'
    err.status = err.status || 500
    
    
    if(err.status === 401){
        return res.status(err.status).send(err)
    }

    if(err.status === 402){
        return res.status(err.status).send(err)
    }

    if(err.status === 404){
        return res.status(err.status).send(err)
    }

    if(err.status === 502){
        return res.status(err.status).send(err)
    }

    if(err.status === 400){
        return res.status(err.status).send(err)
    }

    return  res.status(err.status).send(err)


}

module.exports = {
    errorhandling
}