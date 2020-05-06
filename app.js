const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const { getLogin,postLogin } = require('./routes/login');

const app = express();

app.use(cookieSession({secret: 'todotopsecret'}))
app.use(function(req, res, next){
  if (typeof(req.session.todolist) == 'undefined') {
      req.session.todolist = [];
  }
  next();
})
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });



//auth middlewares
app.use(require('./middlewares/auth'))

//Routes
app.get('/',(req,res)=>{
  res.render('pages/home')
})
app.get('/home',require('./routes/index'))
app.get('/profiles',(req,res)=>{
  res.render('profiles')
})
app.get('/login',getLogin);
app.post('/login',postLogin)
app.get('/logout',require('./routes/logout'))
app.get('/todo',(req,res)=>{
  res.render('todoapp', {todolist: req.session.todolist,day:req.session.day,month:req.session.month,year:req.session.year,bool:req.session.bool});
})
app.post('/todoapp/add/', urlencodedParser, function(req, res) {
  if (req.body.newtodo != '') {
      var d = new Date();
      req.session.id = 0;
      req.session.day = d.getDate();
      req.session.month = d.getMonth()+1;
      req.session.year = d.getFullYear();
      console.log(req.session.day)
      req.session.todolist.push({content:req.body.newtodo,done:false});
  }
  console.log(req.session.todolist)
  res.redirect('/todo');
})
app.get('/todoapp/done/:id', function(req, res) {
  if (req.params.id != '') {
      req.session.todolist.find((t,index)=>{
        if(index==req.params.id){
          t.done = true;
        }
      })
  }
  res.redirect('/todo');
})
app.use(express.static('public'))
app.listen(process.env.port || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
