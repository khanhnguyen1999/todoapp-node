const User = require('../services/user')
function getLogin(req,res,next){
    res.render('pages/login')
};
function postLogin(req,res,next){
    const user = User.findUserByIdAccount(req.body.email)
    if(!user||!User.verifyPassword(req.body.password,user.password))
        return res.render('./pages/login.ejs')
    if(User.verifyPassword(req.body.password,user.password))
    {
        req.session.userId = user.id;
        res.redirect('/home')
    }
};
module.exports = {
    getLogin,
    postLogin,
}