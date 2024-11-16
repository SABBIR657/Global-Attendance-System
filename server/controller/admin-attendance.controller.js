const AdminAttendance = require('../models/AdminAttendance')
const error = require('../utils/error')
const {addMinutes, isAfter} = require('date-fns')


const getEnable = async(req, res, next)=>{
    try {
        const running = await AdminAttendance.findOne({status: 'RUNNING'})
        if(running){
            throw error('Already Running', 400)
        }
        const attendance = new AdminAttendance({})
        await attendance.save();
        return res.status(201).json({
            message: 'success',
            attendance
        })
    } catch (error) {
        next(error)
    }
}

const getRunning = async(req, res, next)=>{
    try {
        const running = await AdminAttendance.findOne({status: 'RUNNING'})
        if(!running){
            throw error('Not Running', 400)
        }

        //comparing the start time and end time with the time limit is the time limit is crossed or not -> date fns
        const started = addMinutes(new Date(running.createdAt), running.timeLimit)

         // here we check isAfter function first parameter refer to now time and the 2nd parameter is the stated time. so we are comparing the now time with the start time.
        if(isAfter(new Date(), started)){
            running.status = 'COMPLETED'
            await running.save();
        }
        
        
        return res.status(200).json({
            running
        })
    } catch (error) {
        next(error)
    }
}

const getDisable = async(req, res, next)=>{
    try {
        const running = await AdminAttendance.findOne({status: 'RUNNING'})
        if(!running){
            throw error('not running', 400);
        }
        running.status = 'COMPLETED'
        await running.save();
        return res.status(200).json({
            running
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {getEnable, getDisable, getRunning };