const router = require('express').Router();
const userController = require('../controller/user.controller')

/**
 * get all the users
 * -filter
 * -sort
 * -pagination
 * - select properties
 * - @route /api/users?sort = ["by","name"]
 * - @method GET
 * - @visibility Private
 */

//get user by id or email
router.get('/:userId',userController.getUserByID);

//update user by id method => PUT
router.put('/:userId',userController.putUserByID);

/**
 * difference between put and patch 
 * when we want to update something entirely means creating something entirely new if the data is not in the system
 * when it's sure there is a data in the system and any type of  the data is need to update
 */

//update user by id method => patch
router.patch('/:userId',userController.patchUserByID);

router.delete('/:userId',userController.deleteUserByID);


//get all the users 
router.get('/',userController.getUsers)

//create a new user
router.post('/', userController.postUser);




module.exports = router