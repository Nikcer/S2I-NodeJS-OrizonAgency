const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    nome : { type : String, require: true},
    cognome : { type : String, require: true},
    email : { type : String, require: true}
});

const User = mongoose.model('User', userSchema )

module.exports = User