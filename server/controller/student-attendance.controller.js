const StudentAttendance = require('../models/StudentAttandance')
const AdminAttendance = require('../models/AdminAttendance');
const error = require('../utils/error');
const {addMinutes, isAfter} = require('date-fns')


const getAttendance = async(req, res, next)=>{
  const {id} = req.params; //admin attendance id
  
    try {
        /**
         * step 1: find admin attendance by id
         * step 2: check if it is running or not
         * step 3: check already registered or not
         * step 4: register entry
         */
        const adminAttendance = await AdminAttendance.findById(id);
        if(!adminAttendance){
            throw error('invalid attendance id', 400)
        }

        if(adminAttendance.status === 'COMPLETED'){
            throw error('Attendance already completed')
        }

        let attendance = await StudentAttendance.findOne({
            adminAttendance: id,
            user: req.user._id
        }) //checking from this particular admin the student registration or not
        if(attendance){
            throw error('already registered', 400)
        }

        attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id
        })
        await attendance.save();

        return res.status(201).json(attendance);

    } catch (error) {
        next(error);
    }
}

const getAttendanceStatus = async(req, res, next)=>{
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

module.exports = {getAttendance, getAttendanceStatus};