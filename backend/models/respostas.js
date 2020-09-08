const mongoose = require('../database');


const RespostasSchema = new mongoose.Schema({
    respostas: {
        type: [{
            titulo: {
                type: String,
            },
            resposta: {
                type: String,
            }
        }]
    },
});

const Respostas = mongoose.model('Respostas', RespostasSchema);

module.exports = Respostas;