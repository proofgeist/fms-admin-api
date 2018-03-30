const auth = require('basic-auth')

module.exports =  (req, res, next)=>{
    const user = auth(req)
    if (!user){

        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
        return next('access denied')
    }
    req.user=user
    return next(null)
}