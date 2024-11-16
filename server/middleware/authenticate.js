const jwt = require('jsonwebtoken');
const User = require('../models/User')

async function authenticate (req, res, next){
    
  

    /**
     * if you want to pass the token in the barrier then the update code will be
     * let token = req.headers.authorization
     * try block -> token = token.split(' ')[1]
     * 
     */

   try {

    let token = req.headers.authorization
    if(!token){
        res.status(401).json({
            message: 'unauthorized'
        })
    }
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, 'secret-key') 
    const user = await User.findById(decoded._id)

    if(!user){
        return res.status(401).json({
            message: 'unauthorized'
        })
    }


    req.user = user

    next();

   

   } catch (error) {
    return res.status(400).json({
        message: 'invalid token'
    })
   }

  



  
}

module.exports = authenticate;
