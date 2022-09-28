const User = require('../models/user');
const multer=require('multer');
// let alert = require('alert')
const passport = require('passport')


const userAuth = require('../middleware/user')



function userRoute(app){

//get login
app.get('/', function (req, res, next) {
	return res.render('user/login.ejs');

});
//get user task
// app.get('/userTask',fetchprojectData().findProjects)




//get user



//post login
app.post('/login',passport.authenticate('local',{successRedirect:'/dashboard',failureRedirect:'/'}));
//get profile--

//get Logout---
app.get('/logout',userAuth,function (req, res, next) {


		
			req.session.destroy(function (err) {
				if (err) {
					return next(err);
				} else {
					return res.redirect('/');
				}
			});
	
});

}

module.exports = userRoute;

