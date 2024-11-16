const { getEnable, getDisable, getRunning} = require('../controller/admin-attendance.controller');

const router = require('express').Router();

router.get('/enabled', getEnable)

router.get('/disabled', getDisable)

router.get('/running', getRunning) //check status running or not running

module.exports = router;