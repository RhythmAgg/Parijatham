const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const { request, response } = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');

const loginRouter = require('express').Router();

loginRouter.post('/validemail', async (request, response) => {
    const body = request.body;
    const email = body.email;

    let found = false;

    const patients = await Patient.find({});
    const doctors = await Doctor.find({});
    for (let i = 0; i < patients.length; i++) {

        if (email === patients[i].EmailId) {
            found = true;
            break;
        }
    }
    for (let i = 0; i < doctors.length; i++) {
        if (email === doctors[i].EmailId) {
            found = true;
            break;
        }
    }
    if (found) {
        response.json('exists');
    }
    else {
        response.json('does not exist');
    }
});

loginRouter.post('/validpassword', async (request, response) => {
    const body = request.body;
    const email = body.email;
    const password = body.PasswordHash;


    let found = false;
    let userDetials = {};
    const patients = await Patient.find({});
    const doctors = await Doctor.find({});
    for (let i = 0; i < patients.length; i++) {

        const emailValid = email === patients[i].EmailId;
        // const passwordValid = await bcrypt.compare(password, patients[i].PasswordHash);
        console.log("here")
        if (emailValid) {

            found = true;
            userDetials = {
                Name: patients[i].Name,
                BasicDetails: patients[i].BasicDetails,
                Doctors: patients[i].Doctors,
                Type: "Patient",
                Id: patients[i]._id
            }
            break;
        }
    }
    for (let i = 0; i < doctors.length; i++) {
        const emailValid = email === doctors[i].EmailId;
       // const passwordValid = await bcrypt.compare(password, doctors[i].PasswordHash);
        if (emailValid ) {
            found = true;
            userDetials = {
                Name: doctors[i].Name,
                BasicDetails: doctors[i].BasicDetails,
                Patients: doctors[i].Patients,
                Type: "Doctor",
                Id: doctors[i]._id
            }
            break;
        }
    }
    if (found) {
        response.json(userDetials);
    }
    else {
        response.json('does not exist');
    }
});




module.exports = loginRouter;