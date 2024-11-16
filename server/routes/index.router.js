const router = require('express').Router();

const authRoutes = require('./auth.router')
const userRoutes = require('./users.router')
const authenticate = require('../middleware/authenticate')

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users',authenticate, userRoutes)


module.exports = router