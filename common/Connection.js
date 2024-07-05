const { default: mongoose } = require("mongoose");
require('dotenv').config();



const connect= ()=>{mongoose.connect(process.env.Mongo_URL)
.then(() => {
    console.log('mongodb is running')
}).catch((err) => {
    console.log('error',err.message)
});
}

module.exports= connect;