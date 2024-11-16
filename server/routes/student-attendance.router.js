const router = require('express').Router();
const {getAttendance, getAttendanceStatus} = require('../controller/student-attendance.controller')

router.get('/status', getAttendanceStatus)
router.get('/:id', getAttendance)



module.exports = router;