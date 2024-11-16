const User = require('../models/User')
const userService = require('../service/user.service')
const error = require('../utils/error')
const authService = require('../service/auth.service')

const getUsers = async(req, res, next)=>{
    /**
     * TODO: filter, sort, pagination, select
     */

    try {
        const users = await userService.findUsers();
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getUserByID =async (req, res, next)=>{
    const userId = req.params.userId
    try {
        const user =await userService.findUserByProperty('_id', userId)
        if(!user){
          throw error('user not found', 404)
          
        }
        return res.status(200).json(user)
       
    } catch (error) {
        next(error)
    }
}

const postUser = async (req,res,next)=>{
    const {name, email, password, roles,accountStatus } = req.body

    try {

        const user = await authService.registerService({name, email, password, roles, accountStatus});
        return res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

const putUserByID =async (req, res, next)=>{
    const userId = req.params.userId
    const {name,email, roles, accountStatus} = req.body

    try {
        const user = await userService.updateUser(userId, {name,email, roles, accountStatus})
        if(!user){
            throw error('user not found', 404)
        }

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const patchUserByID = async(req, res, next)=>{
    const userId = req.params.userId
    const{name, roles, accountStatus} = req.body

    try {
        const user = await userService.findUserByProperty('_id', userId)

        if(!user){
            throw error('user not found',404)
        }
        user.name = name ?? user.name //here we checking the null safe operator (??) if the user name is undefined or null then nothing if the user has data then the operation gonna happen you can also write it like this: name ===undefined ? user.name :name
        user.roles = roles ?? user.roles
        user.accountStatus = accountStatus ?? user.accountStatus
      
        await user.save()
        return res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

const deleteUserByID = async(req, res, next)=>{
    const userId = req.params.userId;
    try {
        const user = await userService.findUserByProperty('_id', userId)

        if(!user){
          throw  error('user not found', 404)
        }
       await user.deleteOne();
        return res.status(203).send();
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getUserByID,
    postUser,
    putUserByID,
    patchUserByID,
    deleteUserByID
}