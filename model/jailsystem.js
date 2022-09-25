const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: { type: String },
    userName: { type: String },
    textChannel: { type: String }
});

module.exports = mongoose.model('jailsystem', schema)