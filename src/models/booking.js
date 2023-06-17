const mongoose = require("mongoose");
const bookingschema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
});
const booking = mongoose.model("bookings", bookingschema);
module.exports = booking;
