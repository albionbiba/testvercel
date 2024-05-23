const CallHistoryEntry = require('../models/CallHistoryEntry');
const AgentMeeting = require('../models/AgentMeeting');
const User = require('../models/User');
const roleIdByTitle = require('../middlewares/roleIdByTitle');
const authController = require('./authController');
const AgentMeeting_a = require('../models/AgentMeeting_a');
exports.dashboard = (req, res) => {
	res.render('marketingManager/dashboard')
};

exports.allocateCalls = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canAllocateCalls) {
        return res.status(405).send('Permission denied');
    }
    try {
        const { number, datetime, assignedAgentName } = req.body;
        const agent = User.find({name: assignedAgentName});
        const reservedCall = await CallHistoryEntry.create({
            number,
            assignedAgent: agent._id,
            datetime,
            reserved: true
        });
        await reservedCall.save;
        res.json({ message: 'Reserved calls allocated successfully', reservedCalls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.adjustSalesAgentSchedule = async (req, res) => {
//     const agentId = req.params.agentId;
//     const newDateTime = req.body.newDateTime;
//     try {
//         const agent = await User.findOne({ _id: agentId });
//         const agentSchedule = await AgentMeeting.find({ userId: agentId })
//         .populate('userId') // Populate user details if needed
//         .exec();
//         //edit agentSchedule
//     } catch (error) {
//         console.error('Error adjusting sales agent schedule:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

exports.viewSalesAgentSchedules = async () => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canViewSalesAgentSchedules) {
        return res.status(405).send('Permission denied');
    }
    try {
        const salesAgentId = roleIdByTitle('Sales Agent');
        const salesAgents = await User.find({ roleId: salesAgentId});

        const agentSchedules = await Promise.all(salesAgents.map(async (agent) => {
            const agentSchedule = await AgentMeeting.find({ userId: agent._id })
                .populate('userId') 
                .exec();
            return { agent, schedule: agentSchedule };
        }));
        agentSchedules.forEach(({ agent, schedule }) => {
            console.log(`Agent: ${agent.name}`);
            schedule.forEach((meeting) => {
                console.log(`- Meeting: ${meeting.datetime}, Type: ${meeting.meetingType}`);
            });
        });

        console.log('Agent schedules retrieved successfully.');
    } catch (error) {
        console.error('Error retrieving agent schedules:', error);
    }
};

exports.viewPhoneAgentStatistics = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canViewPhoneAgentStatistics) {
        return res.status(405).send('Permission denied');
    }
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const phoneAgents = await User.find({ roleId: roleIdByTitle('Phone Agent')});
        // Other filters...

        const agentStatistics = [];
        for (const agent of phoneAgents) {
            const successfulCalls = await CallHistoryEntry.countDocuments({
                userId: agent._id,
                outcome: 'Successful',
                datetime: { $gte: startDate, $lte: endDate }
            });

            const agentStats = {
                agentId: agent._id,
                agentName: agent.name,
                successfulCallsCount: successfulCalls,
                // Other statistics...
            };
            agentStatistics.push(agentStats);
        }
        return res.json(agentStatistics);
    } catch (error) {
        console.error('Error fetching phone agent statistics:', error);
        return res.status(500).send('Internal Server Error');
    }
}

exports.viewSalesAgentStatistics = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canViewSalesAgentStatistics) {
        return res.status(405).send('Permission denied');
    }
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate; 
        // Other filters...
        const salesAgents = await User.find({ roleId: roleIdByTitle('Sales Agent')});

        const agentStatistics = [];
        for (const agent of salesAgents) {
            const successfulMeetingsCount = await AgentMeeting.countDocuments({
                userId: agent._id,
                successful: true,
                datetime: { 
                    $gte: startDate, 
                    $lte: endDate 
                }
            });

            // Other statistics...
            const agentStats = {
                agentId: agent._id,
                agentName: agent.name,
                successfulMeetingsCount: successfulMeetingsCount,
                // Other statistics...
            };
            agentStatistics.push(agentStats);
        }
        return res.json(agentStatistics);
    } catch (error) {
        console.error('Error fetching sales agent statistics:', error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.retrieveMeetings = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canRetrieveMeetings) {
        return res.status(405).send('Permission denied');
    }
    try {
        const meetings = await AgentMeeting.find().populate('clientId').populate('agentId');
        res.json(meetings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.retrieveCalls = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canRetrieveCalls) {
        return res.status(405).send('Permission denied');
    }
    try {
        const calls = await CallHistoryEntry.find().populate('assignedAgent').populate('phoneAgentId');
        res.json(calls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getReferences = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canGetReferences) {
        return res.status(405).send('Permission denied');
    }
    try {
        const referenceId = await roleIdByTitle('reference');
        const references = await User.find({roleId: referenceId}).populate('roleID');
        res.json(references);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.editReference = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canEditReference) {
        return res.status(405).send('Permission denied');
    }
    try {
        const referenceName = req.body.referenceName;
        const reference = await User.findOne({name: referenceName});
        const { 
            name,
            number,
            address,
            profession,
            comments,
            qualified, 
            referral, 
            contacted,
            redList
        } = req.body;

        await User.findByIdAndUpdate(reference._id, {
            name,
            number,
            address,
            profession,
            comments,
            qualified,
            referral,
            contacted,
            redList
        });
        console.log();
        res.json(reference);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateRedListToReserervedCall = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canUpdateRedListToReserervedCall) {
        return res.status(405).send('Permission denied');
    }
    try {
        const referenceName = req.body.referenceName;
        const phoneAgentName = req.body.phoneAgentName;
        const reference = await User.findOne({name: referenceName});
        const phoneAgent = await User.findOne({name: phoneAgentName});
        await User.findByIdAndUpdate(reference._id, {
            redList: false
        });
        const callHistoryEntry = new CallHistoryEntry({
            phoneAgentId: phoneAgent._id,
            number: reference.number,
            datetime: new Date(),
            reserved: true 
        });
        await callHistoryEntry.save();
        res.json(callHistoryEntry)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getBuyersReferencesList = async (req, res) => {
    const managerId = req.user._id;
    const user = await User.findById(managerId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canGetBuyersReferencesList) {
        return res.status(405).send('Permission denied');
    }
    try {
        const referenceId = await roleIdByTitle('reference');
        const references = await User.find({ roleId: referenceId });
        const totalReferences = await User.countDocuments({roleId: referenceId});
        const successfulMeetings = await AgentMeeting.find({ successful: true }).populate('clientId');
        const clientIds = successfulMeetings.map(meeting => meeting.clientId);
        const usersPromises = clientIds.map(clientId => User.findOne({ _id: clientId }));
        const buyers = await Promise.all(usersPromises);
        const totalBuyers = await AgentMeeting.countDocuments({ successful: true });

        res.json({
            references,
            totalReferences,
            buyers,
            totalBuyers
        })
    } catch (err) {
        throw new Error(err.message);
    }
}


//schedule meeting
exports.scheduleSalesAgentMeeting = async (req, res) => {
    const managerId = req.user._id;
    const { agentId, clientId, meetingType,day, title, start, end, startTimezone, endTimezone, repeat, description } = req.body;
    const user = await User.findById(agentId).select('roleId');
    const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er =>{
        return res.status(500).send({status: false,message: 'Failed to fetch role'});
    })
    if(!role) {
        return res.status(405).send({status: false, message: 'Permission denied'});
    }else{
      const meeting = new AgentMeeting_a({
        agentId: agentId,
        clientId: clientId,
        meetingType: meetingType,
        day: day,
        title: title,
        start: start,
        end: end,
        startTimezone: startTimezone,
        endTimezone: endTimezone,
        repeat: repeat,
        description: description
      });
      await meeting.save();
      return res.json({status: true, meeting: meeting});
    }
  
}