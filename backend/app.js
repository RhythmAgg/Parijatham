const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const patientRouter = require('./controllers/patients')
const doctorRouter = require('./controllers/doctors')
const chatRouter = require('./controllers/chats')
const appointmentRouter = require('./controllers/appointments')
const loginRouter = require('./controllers/login')
const hospitalRouter = require('./controllers/hospitals') 
const { Server } = require("socket.io");



mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/patients', patientRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/chats', chatRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/login', loginRouter);
app.use('/api/hospitals', require('./controllers/hospitals'));
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);



module.exports = app  