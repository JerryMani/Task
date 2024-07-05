const express = require('express');
const { createUser, getUser, updatePassword } = require('../controller/userController');

const login = require('../controller/userLogin');



const route = express.Router();

route.post('/post',createUser);
route.get('/get/:id',getUser);
route.post('/login',login);
route.put('/update',updatePassword)


module.exports=route;

