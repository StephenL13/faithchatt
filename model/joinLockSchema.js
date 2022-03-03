const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    guildId: { type: String, required: true },
    lockStatus: { type: Boolean }
});

module.exports = mongoose.model('joinlock-value', schema)