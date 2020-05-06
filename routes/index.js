const User = require('../services/user.js')
module.exports = function index(req,res){
    // const user = User.findUserById(req.session.userId)
    res.render('homepage',{views:req.session.views})
}