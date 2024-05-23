const AgentMeeting = require('../models/AgentMeeting');
const CallHistoryEntry = require('../models/CallHistoryEntry');
const getRoleIdByTitle = require('../middlewares/roleIdByTitle');
const Role = require('../models/Role')
const ScheduleSlot = require('../models/ScheduleSlot');
const User = require('../models/User');
const authController = require('./authController')

exports.dashboard = (req, res) => {
	res.render('phoneAgent/dashboard')
};

exports.getSalesAgentSchedule = async (req, res) => {
    const phoneAgentId = req.user._id;
    const user = await User.findById(phoneAgentId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canGetSalesAgentSchedule) {
        return res.status(405).send('Permission denied');
    }
	try {
		const currentDate = new Date();
		const oneWeekFromNow = new Date(currentDate);
		oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        const salesAgentRoleId = await getRoleIdByTitle('salesAgent');
		const allAgents = await User.find({ roleId: salesAgentRoleId }).populate('roleId');
        console.log('a');
		const agentAvailabilities = await Promise.all(allAgents.map(async (agent) => {
			const availability = await AgentMeeting.find({
				agentId: agent._id,
				datetime: { $gte: currentDate, $lte: oneWeekFromNow }
			});
			return { agent, availability };
		}));
		console.log(agentAvailabilities);
		res.json({agentSchedule: agentAvailabilities});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Failed to retrieve sales agents availability' });
	}
};

exports.getLoggedInAgentCallHistoryLast24Hours = async (req, res) => {
    const phoneAgentId = req.user._id;
    const user = await User.findById(phoneAgentId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canGetLoggedInAgentCallHistoryLast24Hours) {
        return res.status(405).send('Permission denied');
    }
    try {
        const agentId = req.user._id;
        const twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
        const currentTime = new Date();

        const callHistory = await CallHistoryEntry.find({
            phoneAgentId: agentId,
            datetime: {
                $gte: twentyFourHoursAgo,
                $lte: currentTime 
            }
        })
        .select('datetime outcome reserved')
        .exec();
        
		res.json(callHistory);
    } catch (error) {
		res.status(500).json({ error: 'Failed to retrieve call history for the last 24 hours' });
    }
}

function setDaysTimeout(callback,days) {
    let msInDay = 86400*1000; 

    let dayCount = 0;
    let timer = setInterval(function() {
        dayCount++;

        if (dayCount === days) {
          clearInterval(timer);
          callback.apply(this, []);
        }
    }, msInDay);
}

exports.makeCalls = async (req, res) => {
    const phoneAgentId = req.user._id;
    const user = await User.findById(phoneAgentId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canMakeCalls) {
        return res.status(405).send('Permission denied');
    }
    try {
        const { phoneNumber, outcome } = req.body;
        const agentId = req.user._id; 
        const callHistoryEntry = new CallHistoryEntry({
            phoneAgentId: agentId,
            number: phoneNumber,
            datetime: new Date(),
            outcome,
            reserved: false 
        });
        await callHistoryEntry.save();
        if (outcome === 'No answer' || outcome === 'Indecisive') {
            callHistoryEntry.reserved = true;
            await callHistoryEntry.save();
        } else if (outcome === 'Excessive argument') {
            const {name} = req.body;
            const newUser = new User({
                name,
                roleId: await getRoleIdByTitle('client'),
                redList: true
            });
            await newUser.save();
            setDaysTimeout(async () => {
                try {
                    await User.findByIdAndUpdate(newUser._id, {
                        redList: false
                    });
                    callHistoryEntry.reserved = true;
                    await callHistoryEntry.save;
                    console.log('User removed from Red List and updated to Reserved Phone Calls');
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            }, 365);
        } else if (outcome === 'Successful call') {
            const {agentName, clientName, address, profession, comments, newDateTime} = req.body;
            const salesAgent = await User.findOne({name: agentName});
            const salesAgentId = salesAgent._id;
            const newUser = new User({
                name: clientName,
                number: phoneNumber,
                address,
                profession,
                comments,
                qualified: true,
                contacted: true,
                roleId: await getRoleIdByTitle('client')
            });
            await newUser.save();
            const scheduledMeeting = new AgentMeeting({
                agentId: salesAgentId,
                clientId: newUser._id,
                meetingType: 'Scheduled',
                datetime: new Date(newDateTime)
            });
            await scheduledMeeting.save();
        } 
        res.status(201).json({ message: 'Call made successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to make call' });
    }
}

exports.meetingSetup = async (req, res) => {
    const phoneAgentId = req.user._id;
    const user = await User.findById(phoneAgentId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canSetupMeetings) {
        return res.status(405).send('Permission denied');
    }
    try {
        const { clientName, agentName, scheduledDateTime } = req.body;
        const clientUser = await User.findOne({ name: clientName });
        if (!clientUser) {
            return res.status(404).json({ error: 'Client not found' });
        }
        const agentUser = await User.findOne({ name: agentName });
        if (!agentUser) {
            return res.status(404).json({ error: 'Sales agent not found' });
        }
		const scheduledMeeting = new AgentMeeting({
			agentId: agentUser._id,
			clientId: clientUser._id,
			meetingType: 'Scheduled',
			datetime: new Date(scheduledDateTime)
		});
		await scheduledMeeting.save();
        res.status(201).json({ message: 'Meeting scheduled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to schedule meeting' });
    }
}

exports.reservedCalls = async (req, res) => {
    const phoneAgentId = req.user._id;
    const user = await User.findById(phoneAgentId).populate('roleId');
	const roleId = user.roleId;
    const role = await authController.getRole(roleId).catch(er => {
        return res.status(500).send('Failed to fetch role');
    });;
    console.log(role);
    //permission check
    if(!role.canSeeReservedCalls) {
        return res.status(405).send('Permission denied');
    }
    try {
        const agentId = req.user._id;
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); 

        const reservedPhoneCalls = await CallHistoryEntry.find({
            datetime: { $gte: today, $lte: endOfDay }, 
            phoneAgentId: agentId, 
            reserved: true 
        });
        res.json(reservedPhoneCalls);
    } catch (error) {
        console.error('Error retrieving reserved phone calls:', error);
        res.status(500).json({ error: 'Failed to retrieve reserved phone calls' });
    }
}