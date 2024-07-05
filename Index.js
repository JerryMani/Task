const express= require('express');
const connect = require('./common/Connection');
const route = require('./routes/userRoute');

const app = express();
app.use(express.json())
app.use(route)
const port = 5000;



connect();





app.use('/',(req,res)=>{
    res.send('welcome to my world')

})


app.listen(port,()=>{
console.log('server is running',port)
})