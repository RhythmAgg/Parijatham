const appointmentRouter = require('express').Router();
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const { request } = require('express');
const { response } = require('express');
require('dotenv').config()

appointmentRouter.get('/', async (request, response) => {
    const appointments = await Appointment.find({}).populate('doctor').populate('patient');
    response.json(appointments);
});

appointmentRouter.get('/:id', async (request, response) => {
    const appointment = await Appointment.findById(request.params.id).populate('doctor').populate('patient');
    response.json(appointment);
});

// get all appointments for a doctor
appointmentRouter.get('/doctor/:id', async (request, response) => {
    const appointments = await Appointment.find({ doctor: request.params.id }).populate('doctor').populate('patient');
    response.json(appointments);
});

// get all appointments for a patient
appointmentRouter.get('/patient/:id', async (request, response) => {
    const appointments = await Appointment.find({ patient: request.params.id }).populate('doctor').populate('patient');
    response.json(appointments);
});


appointmentRouter.post('/', async (request, response) => {
    const body = request.body;
    const appointment = new Appointment({
        doctor: body.doctor,
        patient: body.patient,  
        status: 'Pending',
        Date: body.Date,
        Time: body.Time
    });
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});

appointmentRouter.post('/Pending', async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(body.id);
    appointment.status = 'Pending';
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});


appointmentRouter.post('/Accepted', async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(body.id);
    appointment.status = 'Accepted';
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});

appointmentRouter.post('/Rejected', async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(body.id);
    appointment.status = 'Rejected';
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});

appointmentRouter.post('/Completed', async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(body.id);
    appointment.status = 'Completed';
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});

module.exports = appointmentRouter;
