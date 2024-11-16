const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {findUserByProperty, createNewUser} = require('./user.service')
const error = require('../utils/error')

const registerService = async({name, email, password, roles, accountStatus}) =>{
    // let user =  await User.findOne({email: email}) //that means the user provide an email we are mathcing the email with the database email (model)
    
    let user = await findUserByProperty('email', email)
    if(user){
     
      throw error ('user already exists', 400)
    }
   
    // user = new User({name, email, password, accountStatus});
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return createNewUser({name, email,password:hash, roles, accountStatus})
    
}

const loginService =async ({email, password}) =>{
    // const user =  await User.findOne({email:email})

    const user = await findUserByProperty('email',email)

    if(!user){
      
        throw error('invalid credentials', 400)
    }

    const isValidPassword = await bcrypt.compare(password,user.password)

    if(!isValidPassword){
        
        throw error('invalid credentials',400)
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        acountStatus: user.acountStatus
    }

  return jwt.sign(payload, 'secret-key', {expiresIn: '2h'})
  
}

module.exports = {
    registerService,
    loginService
}

