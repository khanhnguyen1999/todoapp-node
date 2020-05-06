const User = require('../services/user.js')
// const Todo = require('../services/todo.js')
module.exports = function todoapp(req,res){
    const user = User.findUserById(req.session.userId)  
    res.render('todoapp',{views:req.session.views,user})
}