const express=require('express');
var cors=require('cors');
const mysql = require('mysql');
const connection= require('./connection');
const userRoute=require('./routes/user');
const proRoute=require('./routes/order');
const app=express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/orders',proRoute);
module.exports=app;



