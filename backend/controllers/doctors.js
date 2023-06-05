const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doctorRouter = require('express').Router();
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const { request } = require('express');
const { response } = require('express');
require('dotenv').config()


doctorRouter.get('/', async (request, response) => {
    const doctors = await Doctor.find({}).populate('Patient');
    response.json(doctors);
})

doctorRouter.get('/:id', async (request, response) => {
    const doctor = await Doctor.findById(request.params.id).populate('Patients').populate('Requests');
    response.json(doctor);
})

doctorRouter.get('/others/:id', async (request, response) => {
    const patient = await Patient.findById(request.params.id);
    const otherDoctors = await Doctor.find({ _id: { $nin: patient.Doctors } });

    const otherDoctors2 = otherDoctors.filter((doctor) => {
        return !patient.Requests.includes(doctor._id);
    })
    response.json(otherDoctors2);
})



doctorRouter.post('/', async (request, response) => {
    const body = request.body;
    console.log(body);
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.PasswordHash, saltRounds);
    const regcode = body.RegCode;

    if (regcode !== process.env.REGCODE) {
        return response.status(401).json({
            error: 'Invalid Registration Code'
        })
    }

    const doctor = new Doctor({
        Name: body.Name,
        EmailId: body.EmailId,
        PasswordHash: passwordHash,
        BasicDetails: body.BasicDetails
    })
    const savedDoctor = await doctor.save();
    response.json(savedDoctor);
})

doctorRouter.post('/request', async (request, response) => {
    const body = request.body;
    const doctorId = body.DoctorId;
    const patientId = body.PatientId;
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (patient.Doctors.includes(doctorId)) {
        return response.status(401).json({
            error: 'Already a patient'
        })
    }
    else {
        patient.Requests = patient.Requests.concat(doctorId);
        await patient.save();
    }

    if (doctor.Requests.includes(patientId)) {
        return response.status(401).json({
            error: 'Request already sent'
        })
    }
    else {
        doctor.Requests = doctor.Requests.concat(patientId);
        await doctor.save();
        response.json(doctor);
    }
})

doctorRouter.post('/accept', async (request, response) => {
    const body = request.body;
    const doctorId = body.DoctorId;
    const patientId = body.PatientId;
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (patient.Doctors.includes(doctorId)) {
        return response.status(401).json({
            error: 'Already a patient'
        })
    }
    else {
        patient.Doctors = patient.Doctors.concat(doctorId);
        patient.Requests = patient.Requests.filter(id => id.toString() !== doctorId.toString());
        await patient.save();
    }



    if (doctor.Requests.includes(patientId)) {
        doctor.Requests = doctor.Requests.filter(id => id.toString() !== patientId.toString());
        doctor.Patients = doctor.Patients.concat(patientId);
        await doctor.save();
        response.json(doctor);
    }
    else {
        return response.status(401).json({
            error: 'Request not sent'
        })
    }
})

doctorRouter.post('/reject', async (request, response) => {
    const body = request.body;
    const doctorId = body.DoctorId;
    const patientId = body.PatientId;
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (patient.Requests.includes(doctorId)) {
        patient.Requests = patient.Requests.filter(id => id.toString() !== doctorId.toString());
        await patient.save();
    }
    else {
        return response.status(401).json({
            error: 'Request not sent'
        })
    }

    if (doctor.Requests.includes(patientId)) {
        doctor.Requests = doctor.Requests.filter(id => id.toString() !== patientId.toString());
        await doctor.save();
        response.json(doctor);
    }
    else {
        return response.status(401).json({
            error: 'Request not sent'
        })
    }
})


module.exports = doctorRouter;