const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const CallHistoryEntrySchema = new mongoose.Schema({
	phoneAgentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	number: String,
	assignedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	datetime: Date,
	outcome: {
		type: String,
		enum: ['No answer', 'Indecisive', 'Excessive argument', 'Successful call', 'Not successful']
	},
	reserved: Boolean
});

CallHistoryEntrySchema.plugin(findOrCreate);

module.exports = mongoose.model('CallHistoryEntry', CallHistoryEntrySchema);