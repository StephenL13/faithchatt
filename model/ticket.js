const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: { type: String },
    userName: { type: String },
    channelId: { type: String }
});

module.exports = mongoose.model('ticket', schema)