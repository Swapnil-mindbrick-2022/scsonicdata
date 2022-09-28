function employee(req,res,next) {
    if(req.isAuthenticated() && req.user.role === 'employee') {
        return next()
        
    }
    return res.redirect('/')
}
module.exports = employee


