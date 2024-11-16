const router = require('express').Router();

const authRoutes = require('./auth.router')
const userRoutes = require('./users.router')
const authenticate = require('../middleware/authenticate')
const adminAttendanceRoute =  require('./admin-attendance.router')
const studentAttendanceRoute = require('./student-attendance.router')

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users',authenticate, userRoutes)
router.use('/api/v1/admin/attendance', authenticate,adminAttendanceRoute )
router.use('/api/v1/student/attendance', authenticate,studentAttendanceRoute)




module.exports = router