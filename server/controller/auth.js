const {registerService, loginService} = require('../service/auth.service')

const registerController = async(req, res,next)=>{
    /**
     * Request input sources:
     * -Req body -> form data
     * -Req param
     * -Req Query
     * -Req Header
     * -Req Cookies
     */

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
 
  
    //validation checks
    if(!name || !email || !password){
     return res.status(404).json({
         message: 'invalid data'
     })
    }
 
  try {
     const user = await registerService({name, email, password})
     return res.status(201).json({
      message: 'user created successfully',
      user
    })
 
  } catch (error) {
    next(error);
  }
}

const loginController = async(req, res, next)=>{
    const email = req.body.email
    const password = req.body.password

    try {
      const token = await loginService({email, password})
      return res.status(200).json({
        message:'login successful',
        token
        
      })
    } catch (error) {
        next(error);
    }

}


module.exports = {registerController, loginController}