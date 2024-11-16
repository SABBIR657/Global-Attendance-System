const {model, Schema} =  require('mongoose');


const studentAttandanceSchema = new Schema({
    createdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    AdminAttandance :{
        type: Schema.Types.ObjectId,
        ref: AdminAttandance,
    }
})

const StudentAttandance = model('AdminAttandance', studentAttandanceSchema);

module.exports = StudentAttandance;