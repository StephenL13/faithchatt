const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: { type: String },
});

module.exports = mongoose.model('ticket', schema)