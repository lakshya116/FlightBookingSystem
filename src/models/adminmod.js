const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    }
});
const adminsch = new mongoose.model('adminuser',adminSchema);
module.exports = adminsch;