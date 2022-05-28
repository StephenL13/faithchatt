const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    messageId: { type: String },
});

module.exports = mongoose.model('askQuestionSticky', schema)