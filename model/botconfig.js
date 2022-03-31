const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    guildId: { type: String, required: true },
    verifyAutoClose: { type: Boolean },
    verifyLock: { type: Boolean }
});

module.exports = mongoose.model('botconfig-values', schema)