const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const SalesAgentMeetingSchema = new mongoose.Schema({
	agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	meetingType: {
		type: String,
		enum: ['Instant', 'Scheduled']
	},
  day: String,
	title: String,
  start: String,
  end: String,
  startTimezone: String,
  endTimezone: String,
  repeat: String,
  description: String,
	// successful: Boolean,
	// canceled: Boolean,
	// canceledBy: {
	// 	type: String,
	// 	enum: ['agent', 'client']
	// }
});

SalesAgentMeetingSchema.plugin(findOrCreate);

module.exports = mongoose.model('AgentMeeting_a', SalesAgentMeetingSchema);