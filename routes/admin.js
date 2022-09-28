
// const User = require('../models/user');
const  path = require('path');
const admin = require('../middleware/admin')
const User = require('.././models/user')
const passport = require('passport');
const List =require('../models/dashboad');




function adminRoute(app){

//admin -Get Register---
app.get('/admin', function (req, res, next) {
	return res.render('user/register.ejs');
	
});




//Register User---------
app.post('/admin', function(req, res, next) {
	console.log(req.body);
	const personInfo = req.body;


	if(!personInfo.firstName || !personInfo.lastName || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({username:personInfo.username},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}
						var newPerson = new User({
							unique_id:c,
							firstName:personInfo.firstName,
							lastName:personInfo.lastName,
							username: personInfo.username,
							password: personInfo.password,
							role:"admin"
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});



//post login admin----
app.post('/',passport.authenticate('local',{failureRedirect:'/',successRedirect:'/dashboard'}));

//  LOgout
app.get('/logout', function (req, res, next) {
	
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
			adminLogin = false
    		return res.redirect('/');
    	}
    });
}
});
	
// post data
app.post('/data',(req,res)=>{
	data= req.body

	if (data){
		const mydata = new List({
			name:data.name,
			criteria:data.criteria,
			value:data.value,
			days:data.days,
			pricesignal:data.pricesignal,
			email:data.email,
			phone:data.phone
		})
		mydata.save( (err,success)=>{
			if (err){
				console.log(err)
			}else{
				res.redirect('/dashboard')
			}
		})
	
	}



})


// get data on the table and graph 
app.get('/dashboard', admin,function (req, res, next) {

	const alldata= List.find({},(err,data)=>{

		if (err){
			console.log(err)
			res.redirect('/dashboard')
		}else{

			User.find({},(err,userdata)=>{
				if(err){
					console.log(err)
				}else{
					let dk1 = []

					let dk2 = []
					let dkgas = []
		
				data.forEach((val)=>{
				  if (val.pricesignal == 'DK1'){
					dk1.push(val.value)
				  }else if (val.pricesignal == 'DK2'){
					dk2.push(val.value)
				  }else{
					dkgas.push(val.value)
				  }
				})
				console.log(dk1)
				
					return res.render('dashboard/dashbord.ejs',{'data': data,'dk1':JSON.stringify(dk1),'dk2':JSON.stringify(dk2)
					,'dkgas':JSON.stringify(dkgas),'userdata':userdata});
					
				}
			})
			
		

		}
	})
	


	
});

//  delete table deta
app.delete('/delete/:id',admin,  (req,res)=>{
	List.findByIdAndRemove(req.params.id,(err)=>{
		if (err){
			res.redirect('/dashboard')
		}else{
			res.redirect('/dashboard')
		}
	})
	

	
})
//  for sliding dashboard deta sample view file 
app.get('/dashdata', admin,function (req, res, next) {
	return res.render('user/dashboard.ejs');
	
});
app.get('/demand', admin,function (req, res, next) {
	return res.render('user/demand.ejs');
	
});

}
module.exports = adminRoute;