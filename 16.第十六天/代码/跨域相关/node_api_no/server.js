const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const moment = require('moment');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// 设置静态资源文件夹
app.use(express.static('static'));


app.get('/',(req,res)=>{
    res.end('hello world!');
})


// 新闻接口
app.get('/news',(req,res)=>{
    fs.readFile('./data/news.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 房屋的接口
app.get('/home/groups',(req,res)=>{
    fs.readFile('./data/house.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})




app.listen('7892',()=>{
    console.log('API server start at port 7892');
})