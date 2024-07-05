const { default: mongoose, Schema } = require("mongoose")




const schema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    
});



const userData = new mongoose.model('user',schema)

module.exports = userData;