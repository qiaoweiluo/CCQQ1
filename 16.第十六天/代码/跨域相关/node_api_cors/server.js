const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const axios = require('axios');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// 设置静态资源文件夹
app.use(express.static('static'));


// 设置跨域
app.use(cors());


app.get('/',(req,res)=>{
    res.end('hello world!');
})


// 新闻数据接口
app.get('/news',(req,res)=>{
    fs.readFile('./data/news.json', (err, data) => {
        if (err) throw err;
        //console.log(data.toString());
        res.append('content-type', 'application/json');
        res.send(data.toString());
      });   
})

// 代理请求7892
app.get('/newsok',(req,res)=>{
    axios.get('http://localhost:7892/news').then(dat=>{
        //console.log(dat);
        var sData = JSON.stringify(dat.data);
        res.append('content-type', 'application/json');        
        res.send(sData);
    })
})


app.listen('7890',()=>{
    console.log('API server start at port 7890');
})