const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const RoleSchema = new mongoose.Schema({
	title: String, //reference, client, admin, agent, coo, manager
	scheduleSlotAdd: Boolean,
	canViewScheduledMeetings: Boolean,
	canAddReference: Boolean,
	canSetupInstantMeeting: Boolean,
	canLogMeetingOutcome: Boolean,
	canViewSales: Boolean,
	canEditMeetings: Boolean,
	canAddScheduleSlot: Boolean,
	canGetSalesAgentSchedule: Boolean,
	canGetLoggedInAgentCallHistoryLast24Hours: Boolean,
	canMakeCalls: Boolean,
	canSetupMeetings: Boolean,
	canSeeReservedCalls: Boolean,
	canAllocateCalls: Boolean,
	canViewSalesAgentSchedules: Boolean,
	canViewPhoneAgentStatistics: Boolean,
	canViewSalesAgentStatistics: Boolean,
	canRetrieveMeetings: Boolean,
	canRetrieveCalls: Boolean,
	canGetReferences: Boolean,
	canEditReference: Boolean,
	canUpdateRedListToReserervedCall: Boolean
});

RoleSchema.plugin(findOrCreate);

module.exports = mongoose.model('Role', RoleSchema);