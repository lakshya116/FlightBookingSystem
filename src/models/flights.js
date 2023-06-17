const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    DepartureLocation:{
        type:'string',
        required:true,
    },
    ArrivalLocation:{
        type:'string',
        required:true,
    },
    DepartureDate:{
        type:'date',
required:true
    },
    ArrivalDate:{
        type:'date',
        required:true
    },
    EconomySeats:{
        type:'number',
        required:true
    },
    BusinessSeats:{
        type:'number',
        required:true
    },
    FirstClassSeats:{
        type:'number',
        required:true
    },
    EconomySeatPrice:{
        type:'number',
        required:true
    },
    BusinessSeatPrice:{
        type:'number',
        required:true
    },
    FirstClassSeatPrice:{
        type:'number',
        required:true
    },
    RefundableStatus:{
        type:'string',
        required:true,
    },
    AirwaysName:{
        type:'string',
        required:true
    }
});
const flightdata = mongoose.model('flightdata',flightSchema);
module.exports = flightdata;