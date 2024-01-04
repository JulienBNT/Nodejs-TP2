const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../database/database')
// role = 2 donc admin

exports.auth = (req, res, next) =>{
    const token = req.headers.authorization
    if(token && process.env.SECRETKEY){
        jwt.verify(token, process.env.SECRETKEY, async (err, decoded)=>{
            if(err){
                res.status(401).json({erreur: "x access"})
            }
            else{
                const result = await db.query('SELECT role FROM user where email= ?',[decoded.email])
                if(result.length === 1 && result[0].role === 2){
                    next()
                }
                else{
                    res.status(403).json({erreur: "access denied"})
                }
            }
        })
    }else{
        res.status(401).json({erreur: "x access"})
    }
}