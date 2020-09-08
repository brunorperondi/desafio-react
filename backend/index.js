const boot = require('./services/boot');
const mongoose = require('./database');

mongoose.connect(process.env.MONGO_DB, boot());