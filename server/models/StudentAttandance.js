const {model, Schema} =  require('mongoose');


const studentAttandanceSchema = new Schema({
   
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminAttendance :{
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance',
        required: true
    }
},{timestamps: true})

const StudentAttandance = model('StudentAttandance', studentAttandanceSchema);

module.exports = StudentAttandance;