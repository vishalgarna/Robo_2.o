// require('./config/db.config')
// require('./Websocketservices/websocketServices')

const {errorhandling} = require('./erorHandling')
const express = require('express')
const router = require('./router/router')
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 2003

app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}))



app.use(errorhandling)
app.use(router)
app.get('/', (req, res) => {

    res.send('Kem Cho Mja Me :)').status(200)
})

app.get('*', (req, res) => {
    res.send('Sorry Aaapo Yaha Kuch Nahi milega !').status(401)
})




app.listen(port, () => {
    console.log(`Server is running ${port}`);
})



// git commit --amend --no-edit
// git push --force
