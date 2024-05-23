const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const PhoneNumbersSchema = new mongoose.Schema({
  client: String,
  number: String
})

PhoneNumbersSchema.plugin(findOrCreate);
module.exports = mongoose.model('PhoneNumbers', PhoneNumbersSchema);