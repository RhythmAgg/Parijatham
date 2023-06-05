const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Dates: [
        {
            Date: {
                type: String,
            },
            status: {
                type: String
            }
        }
    ]
})

hospitalSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital 