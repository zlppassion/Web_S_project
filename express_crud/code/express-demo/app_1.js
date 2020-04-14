var express=require('express')

var app=express()
// 当以 /public/ 开头的时候，去 ./public/ 目录中找找对应的资源
// 这种方式更容易辨识，推荐这种方式
app.use('/public', express.static('./public/'))

//这是a就像别名一样，表示./public/
app.use('/a/', express.static('./public/'))


app.get('/',function(req,res){
    res.send('hello world')
})
app.get('/login',function(req,res){
    res.send('login page')
})
app.get('/ppqq',function(req,res){
    res.send('Be Forever')
})

app.listen(3000,function(){
    console.log('express app is running.....')
})