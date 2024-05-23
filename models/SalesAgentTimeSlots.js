const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const SalesAgentTimeSlotsSchema = new mongoose.Schema({
  salesAgent: {
    type: mongoose.Schema.Types.Object,
    ref: 'User',
  },
  day: String,
  startTime: String,
  endTime: String
})

SalesAgentTimeSlotsSchema.plugin(findOrCreate);
module.exports = mongoose.model('SalesAgentTimeSlots', SalesAgentTimeSlotsSchema);