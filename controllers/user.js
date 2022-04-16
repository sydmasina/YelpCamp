const User = require('../models/user');

module.exports.registerUserForm = (req, res)=>{
    res.render('users/register');
}

module.exports.register = async (req, res, next)=>{
    try{
    const {username, email, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err =>{
        if(err) return next(err);
        req.flash('success', 'Registered! Welcome to YelpCam!');
        res.redirect('/campgrounds');
    })
    }catch(e){ 
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.loginForm = (req, res)=>{
    res.render('users/login');
}

module.exports.loginUser = (req, res)=>{
    req.flash('success', 'Logged in');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res)=>{
    req.logout();
    req.flash('success', 'You are logged out!')
    res.redirect('/campgrounds')
}