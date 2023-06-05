const Chat = require('../models/chat');
const { request } = require('express');
const { response } = require('express');
const { findById } = require('../models/chat');
require('dotenv').config()

const chatRouter = require('express').Router();

chatRouter.get('/', async (request, response) => {
    const chats = await Chat.find({});
    response.json(chats);
});

chatRouter.get('/:id', async (request, response) => {
    try {
        const [doctorId, patientId] = request.params.id.split('_');
        const chat = await Chat.findOne({ doctor: doctorId, patient: patientId });


        if (!chat) {
            const chat = new Chat({
                doctor: doctorId,
                patient: patientId
            });
            const savedChat = await chat.save();
            response.json(savedChat);
        }
        else {
            return response.json(chat);
        }
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: 'Server Error' });
    }
});

chatRouter.post('/', async (request, response) => {
    const body = request.body;
    const chat = new Chat({
        doctor: body.doctor,
        patient: body.patient
    });
    const savedChat = await chat.save();
    response.json(savedChat);
});

chatRouter.post('/addmessage', async (request, response) => {
    const body = request.body;
    const chatId = body.chatId;
    const message = body.message;
    const whosent = body.whosent;

    const chat = await Chat.findById(chatId);
    console.log(chat);
    // need to check if messages is empty
    chat.messages.unshift({
        user: {
            _id: whosent
        },
        text: message,
        createdAt: new Date()
    });

    const savedChat = await chat.save();
    response.json(savedChat);
});

module.exports = chatRouter;