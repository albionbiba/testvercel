const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const ReservedCallsSchema = new mongoose.Schema({
  number: String,
  assignedAgent: String,
  datetime: Date,
  reserved: Boolean,
  client: String,
})

ReservedCallsSchema.plugin(findOrCreate);
module.exports = mongoose.model('ReservedCalls', ReservedCallsSchema);