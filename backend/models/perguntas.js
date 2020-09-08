const mongoose = require('../database');

const PerguntasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        default: '',
    },
    alternativas: {
        type: Array,
        default: [],
    }
});

const Perguntas = mongoose.model('Perguntas', PerguntasSchema);

module.exports = Perguntas;