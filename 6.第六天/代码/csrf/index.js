const express = require('express');
const bodyParser = require('body-parser');

const app = express();
 

// 设置获取post数据
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

// 设置静态资源文件夹
app.use(express.static('static'));


// 设置模板引擎为ejs
app.set('view engine','ejs');

// 设置模板引擎文件夹
app.set('views',__dirname+'/static/template');


app.get('/',(req,res)=>{
    res.send('Hello world!');
})

// 登录页面
app.get('/login',(req,res)=>{
    res.render('login',{
        sTr:'登录页'
    })
})

// 转账页面
app.get('/transfer',(req,res)=>{
    let sCookie = req.headers.cookie;
    // console.log(sCookie);
    if(sCookie){
        res.render('transfer',{
            sTr:'转账页'
        })
    }else{
        res.redirect('/login');
    }
})

// 用户登录路由
app.post('/signin',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    if(username=='tom'&&password=='123456'){
        res.cookie('player',username);
        res.redirect('/transfer');
    }else{
        res.append('content-type', 'application/json');
        res.send('{"code":401,"msg":"用户名或密码有误！"}');
    }        
})


// 用户转账路由
app.post('/pay',(req,res)=>{    
    let sCookie = req.headers.cookie;
    
    let csrf_token =  req.body.csrf_token;
    if(csrf_token!='alsdjfloroiuewr23439409809++??==iir'){
        res.send('滚犊子！');
        return;
    }

    if(sCookie){
        let who = req.body.who;
        let money = req.body.money;

        res.send('你给'+ who + '转了' + money + '个游戏币！');
    }else{
        res.send('滚犊子！');
    }     
})



app.listen('7892',()=>{
    console.log('server start at port 7892');
})