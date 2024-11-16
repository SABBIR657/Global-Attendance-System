const {model, Schema} =  require('mongoose');

const adminAttendanceSchema = new Schema({
    timeLimit: {
        type: Number,
        required: true,
        max: 30,
        min: 5,
        default: 5
    },
    status:{
        type:String,
        required: true,
        enum: ['RUNNING', 'COMPLETED'],
        default: 'RUNNING',
    }
    

}, {timestamps: true}) //it will generate two property one is created at another one is updated at.

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema);

module.exports = AdminAttendance;