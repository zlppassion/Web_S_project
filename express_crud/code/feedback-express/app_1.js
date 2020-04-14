var express=require('express')
var app=express()
var bodyParser=require('body-parser')
app.use('/public/',express.static('./public/'))

// 配置使用 art-template 模板引擎
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然外面这里不需要加载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'))



// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中


// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var comments=[
    {
        name:'张三',
        message:'今天天气真不错',
        dateTime:'2020-4-12'
    },
    {
        name:'张三2',
        message:'今天天气真不错',
        dateTime:'2020-4-12'
    },
    {
        name:'张三3',
        message:'今天天气真不错',
        dateTime:'2020-4-12'
    },
    {
        name:'张三4',
        message:'今天天气真不错',
        dateTime:'2020-4-12'
    },
    {
        name:'张三5',
        message:'今天天气真不错',
        dateTime:'2020-4-12'
    }

]



app.get('/',function (req,res){
   res.render('index_1.html',{
       comments:comments
   })
})

// app.get('/admin',function(req,res){
//     res.render('admin/index.html',{
//         title:'管理系统'
//     })
// })

app.get('/post',function(req,res){
    res.render('post_1.html')
})


//当以POST请求  /post的时候，执行指定的处理函数
//这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post',function(req,res){
   // console.log('收到表单post请求了')
    //console.log(req.body)
      // console.log(req.query)
   var comment =req.body
   comment.dateTime ='2020-4-13 16:27:39'
   comments.unshift(comment)
   res.redirect('/')

})




// app.get('/pinglun',function(req,res){
//   console.log(req.query)
//   var comment =req.query
//   comment.dateTime ='2020-4-13 15:27:39'
//   comments.unshift(comment)
//   res.redirect('/')
//   // res.statusCode = 302
//     // res.setHeader('Location', '/')

// })
app.listen(3000,function(){
    console.log('running......')
})