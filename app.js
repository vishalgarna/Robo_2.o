require('./config/db.config')
require('./Websocketservices/websocketServices')
const express = require('express')
const router = require('./router/router')
const port = process.env.PORT || 2003
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(router)



app.get('/json', (req, res) => {

    res.send(JSON.stringify(json)).status(200)
})
app.get('/', (req, res) => {

    res.send('Kem Cho Mja Me :)').status(200)
})

app.get('*', (req, res) => {
    res.send('Sorry Aaapo Yah Kuch Nahi milega !').status(200)
})


app.listen(port, () => {
    console.log('Server is running');
})