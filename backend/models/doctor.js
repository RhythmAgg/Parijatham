const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    Name: String,
    EmailId: String,
    PasswordHash: String,
    BasicDetails: String,
    Patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    Requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }]
})

doctorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.PasswordHash
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor