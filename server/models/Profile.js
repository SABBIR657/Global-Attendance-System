const {model, Schema} = require('mongoose');

const profileSchema = new Schema({
    firstName: String,
    lastname: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // the model name where i want to build the relationship
    } ,
    phoneNumber: String,
    avatar: String,
})



const Profile =  model('Profile', profileSchema);

module.exports = Profile;