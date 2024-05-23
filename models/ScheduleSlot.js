const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const ScheduleSlotSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slotStart: Date,
	slotEnd: Date
});

ScheduleSlotSchema.plugin(findOrCreate);

module.exports = mongoose.model('ScheduleSlot', ScheduleSlotSchema);

//maybe redundant