const express = require('express');
const Respostas = require('../models/respostas');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const resposta = await Respostas.create(req.body);
        return res.status(200).send(resposta);
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Register error!'});
    }
});

module.exports = app => app.use('/respostas', router);