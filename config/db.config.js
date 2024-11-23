const mongoose = require('mongoose');

url = "mongodb+srv://vishalgarna:vishalgarna%401@cluster0.uxsnu.mongodb.net/Algo-backend"

const db = mongoose.connect(url).then(() => {
    console.log('Db Is Connected');

}).catch((error)=>console.log(error)
)


module.exports = db