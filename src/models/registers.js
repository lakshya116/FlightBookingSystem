const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    Birthday:{
        type:'date',
        required: true
    },
    Gender:{
        type: 'string',
        required: true
    },
    Email:{
        type: 'string',
        required: true,
        unique: true
    },
    Phonenumber:{
        type:'number',
        required: true
    }
});

const Register = mongoose.model('register',userSchema);
module.exports=Register;