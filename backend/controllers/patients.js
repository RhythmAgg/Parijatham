const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const patientRouter = require('express').Router();
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const { request } = require('express');
const { response } = require('express');
require('dotenv').config()

patientRouter.get('/', async (request, response) => {
    const patients = await Patient.find({}).populate('Doctors', { Name: 1, EmailId: 1,  BasicDetails: 1 });
    response.json(patients);
})

patientRouter.get('/:id', async (request, response) => {
    const patient = await Patient.findById(request.params.id).populate('Doctors').populate('Requests');
    response.json(patient);
})

patientRouter.post('/', async (request, response) => {
    const body = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.PasswordHash, saltRounds);
    const regcode = body.RegCode;

    console.log(body);
    console.log(process.env.REGCODE);
    if (regcode != process.env.REGCODE) {
        return response.status(401).json({
            error: 'Invalid Registration Code'
        })
    }
    const patient = new Patient({
        Name: body.Name,
        EmailId: body.EmailId,
        PasswordHash: passwordHash,
        BasicDetails: body.BasicDetails
    })
    const savedPatient = await patient.save();
    response.json(savedPatient);
})

module.exports = patientRouter;

