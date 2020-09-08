const express = require('express');
const Perguntas = require('../models/perguntas');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pergunta =  await Perguntas.find();
        return res.status(200).send(pergunta);
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Search error!'});
    }
});

router.post('/nova', async (req, res) => {
    try {
        const pergunta = await Perguntas.create(req.body);
        return res.status(200).send(pergunta);
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Register error!'});
    }
});

module.exports = app => app.use('/perguntas', router);