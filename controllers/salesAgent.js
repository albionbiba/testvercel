const getRoleIdByTitle = require('../middlewares/roleIdByTitle');
const Role = require('../models/Role')
// const ScheduleSlot = require('../models/ScheduleSlot');
const User = require('../models/User');
const AgentMeeting = require('../models/AgentMeeting');
const authController = require('./authController');
const SalesAgentTimeSlots = require('../models/SalesAgentTimeSlots');
exports.dashboard = async (req, res) => {
	res.render('salesAgent/dashboard');
};

exports.viewScheduledMeetings = async (req, res) => {
	try {
		const salesAgentId = req.user._id;
		const user = await User.findById(salesAgentId).populate('roleId');
		const roleId = user.roleId;
		const role = await authController.getRole(roleId).catch(er => {
			return res.status(500).send('Failed to fetch role');
		});;
		console.log(role);
		//permission check
		if(!role.canViewScheduledMeetings) {
			return res.status(405).send('Permission denied');
		}
		console.log(salesAgentId);
		const agentSchedules = await AgentMeeting.find({agentId: salesAgentId, meetingType: 'Scheduled'});
		if (agentSchedules.length === 0) {
            return res.json({ message: 'No scheduled meetings found for the agent' });
        }
		agentSchedules.forEach((meeting) => {
			console.log(`- Meeting: ${meeting.datetime}, Type: ${meeting.meetingType}`);
		});
		res.json({agentSchedules});
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while retrieving agent schedules' });
	}
};

exports.addReference = async (req, res) => {
	const salesAgentId = req.user._id;
	const user = await User.findById(salesAgentId).populate('roleId');
	const roleId = user.roleId;
	const role = await authController.getRole(roleId).catch(er => {
		return res.status(500).send('Failed to fetch role');
	});;
	console.log(role);
	//permission check
	if(!role.canAddReference) {
		return res.status(405).send('Permission denied');
	}
	try {
		const {
			name,
			address,
			profession,
			comments,
			qualified,
			referral,
			contacted,
			role
		} = req.body;
		const roleId = await getRoleIdByTitle(role);

		const newUser = new User({
			name,
			address,
			profession,
			comments,
			qualified,
			referral,
			contacted,
			roleId
		});

		await newUser.save();

		res.json({message: 'Reference added successfully'});
	} catch (error) {
		console.error('Error adding reference:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};

exports.setupInstantMeeting = async (req, res) => {
	const salesAgentId = req.user._id;
	const user = await User.findById(salesAgentId).populate('roleId');
	const roleId = user.roleId;
	const role = await authController.getRole(roleId).catch(er => {
		return res.status(500).send('Failed to fetch role');
	});;
	console.log(role);
	//permission check
	if(!role.canSetupInstantMeeting) {
		return res.status(405).send('Permission denied');
	}
	try {
		const agentId = req.user._id;
		const {
			dateAndTime,
			clientFullName
		} = req.body;
		const client = await User.findOne({name: clientFullName});
		console.log(client);
		if (!client) {
			console.log('NO CLIENT');
			const roleId = await getRoleIdByTitle('client');
			const newClient = new User({
				name: clientFullName,
				roleId
			});
			await newClient.save();
			var clientId = newClient._id;
		} else {
			console.log("CLIENT");
			clientId = client._id;
		}
		const datetime = new Date(dateAndTime);
		console.log(datetime);

		const newMeeting = new AgentMeeting({
			agentId,
			clientId,
			meetingType: 'Instant',
			datetime,
			successful: false
		});

		await newMeeting.save();

		res.json({message: 'Instant meeting setup successfully'});
	} catch (error) {
		console.error('Error setting up instant meeting:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};

exports.logMeetingOutcome = async (req, res) => {
	const salesAgentId = req.user._id;
	const user = await User.findById(salesAgentId).populate('roleId');
	const roleId = user.roleId;
	const role = await authController.getRole(roleId).catch(er => {
		return res.status(500).send('Failed to fetch role');
	});;
	console.log(role);
	//permission check
	if(!role.canLogMeetingOutcome) {
		return res.status(405).send('Permission denied');
	}
	try {
		const {
			meetingId,
			successful
		} = req.body;
		const meeting = await AgentMeeting.findById(meetingId);
		console.log(meeting);
		if (successful) {
			meeting.successful = true;
		} else {
			meeting.canceled = true;
			const canceledBy = req.body.canceledBy;
			meeting.canceledBy = canceledBy;
		}
		await meeting.save();
		res.json({message: 'Meeting outcome logged successfully'});
	} catch (error) {
		console.error('Error logging meeting outcome:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};

exports.specifyTimeSlots = async (req, res) => {
  // console.log("USER ",req.user._id);
  // if(req.user._id === undefined){
  //   return res.status(401).send('Unauthorized');
  // }
  const salesAgentId = req.user._id;
  const user = await User.findById(salesAgentId).select('name');
  const { isActive, day, from, to } = req.body;
  // console.log("reqq ", req);
  console.log("bodyy ",req.body);
  if(isActive){
    const newScheduleSlot = new SalesAgentTimeSlots({
      salesAgent: user.name,
      day: day,
      startTime: from,
      endTime: to,
    });
    await newScheduleSlot.save();
    return res.json({status: true, message: 'Time slot added successfully', scheduleSlot: newScheduleSlot});
  }
  return res.json({status: false, message: 'Something went wrong!' });
}