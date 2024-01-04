const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = (req, res, next) =>{
    const token = req.params.token ? req.params.token : req.headers.authorization
    if(token && process.env.SECRETKEY){
        jwt.verify(token, process.env.SECRETKEY, (err)=>{
            if(err){
                res.status(401).json({erreur: "x access"})
            }
            else{
                next()
            }
        })
    }else{
        res.status(401).json({erreur: "x access"})
    }
}