const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { viewScheduledMeetings } = require('../controllers/salesAgent');
const reservePhoneCalls = require('../controllers/reservePhoneCalls');
const fetchReservedCalls = require('../controllers/fetchReservedCalls')
const phoneAgent = require('../controllers/phoneAgent');
const adm = require('../controllers/admin');
const registerPhoneNumbers = require('../controllers/registerNums');
const fetchPhoneNums = require('../controllers/fetchPhoneNums');
const fetchPhoneAgents = require('../controllers/fetchPhoneAgent');
const salesAgentController = require('../controllers/salesAgent');
const marketingManager = require('../controllers/marketingManager');
const fetchMeetings = require('../controllers/fetchMeetings');
const checkRole = require("../controllers/checkRole");
// const marketingManagerController = require('../controllers/marketingManagerController');
// const phoneAgentController = require('../controllers/phoneAgentController');
const {makeSureIs} = require('../middlewares/authMiddleware');

router.post('/reserveCalls', reservePhoneCalls.reserveCalls);
// router.post('/reserveCalls', phoneAgent.reservedCalls);
router.get('/fetchReservedCalls', fetchReservedCalls.fetchReservedCalls);
router.get('/', authController.index);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/registerNums', registerPhoneNumbers.registerNums);

// router.get('/reservedC', reservePhoneCalls.reserveCalls);

// admin routes
router.get('/admin/dashboard', adm.adminDashboard);
router.post('/admin/user/add', adm.createUser);
router.get('/fetchNums', fetchPhoneNums.fetchPhoneNums);
router.get('/fetchPhoneAgents', fetchPhoneAgents.fetchPhoneAgents);
router.post('/availableHours', makeSureIs("salesAgent"), salesAgentController.specifyTimeSlots);

router.post('/createMeeting', makeSureIs("marketingManager"), marketingManager.scheduleSalesAgentMeeting);
router.get('/fetchMeetings', makeSureIs("salesAgent"), fetchMeetings.fetchMeetings);
router.get('/isAuthenticated', authController.requireAuth);
router.post('/checkRole', checkRole.checkRole);
//marketing manager routes
// router.post('/manager/calls/add', makeSureIs('manager'), marketingManagerController.allocateCalls);
// router.post('/manager/adjust-schedule/:agentId', makeSureIs('manager'), marketingManagerController.adjustSalesAgentSchedule);
// router.get('/manager/view-schedules/', makeSureIs('manager'), marketingManagerController.viewSalesAgentSchedules);
// router.get('/manager/view-sales-agent-statistics/', makeSureIs('manager'), marketingManagerController.viewSalesAgentStatistics);
// router.get('/manager/view-phone-agent-statistics/', makeSureIs('manager'), marketingManagerController.viewPhoneAgentStatistics);

//sales agent routes
// router.get('/sales-agent', makeSureIs('sales agent'), salesAgentController.dashboard);

const roleNames = [
	'admin', 'salesAgent', 'phoneAgent', 'marketingManager'
];

roleNames.forEach(role => {
	router.get('/' + role + '/:page', (req, res, next) => {
		if (!authController.requireAuth(req, res)) {
			return;
		}
		var page = req.params.page;
		const ctrl = require('../controllers/'+role);
		if (ctrl[page]) {
			ctrl[page](req, res, next);
		} else {
			res.status(404).send('Page not found');
		}
	});

	router.post('/' + role + '/:action', (req, res, next) => {
        if (!authController.requireAuth(req, res)) {
            return;
        }
        var action = req.params.action;
        const ctrl = require('../controllers/' + role);
        if (ctrl[action]) {
            ctrl[action](req, res, next);
        } else {
            res.status(404).send('Action not found');
        }
    });
});


router.all('/scheduleSlot', async (req , res, next) => {
	if (!authController.requireAuth(req, res)) {
		return;
	}
	const ctrl = require('../controllers/scheduleSlot');

	var role = await authController.getRole(req.user.roleId).catch(er => {
		return res.status(500).send('Failed to fetch role');
	});

	if (!ctrl.hasPermission(role)) {
		return res.status(405).send('Permission denied');
	}
	const method = req.method.toLowerCase();
	if (ctrl[method]) {
		ctrl[method](req, res, next);
	} else {
		res.status(405).send('Slot Method Not Allowed');
	}
});
//
// //router.post('/sales-agent/setup-schedule', makeSureIs('sales agent'), salesAgentController.setupSchedule);
// router.get('/sales-agent/view-scheduled-meetings', makeSureIs('sales agent'), salesAgentController.viewScheduledMeetings);
// router.post('/sales-agent/meeting/add', makeSureIs('sales agent'), salesAgentController.setupInstantMeeting);
// router.post('/sales-agent/log-meeting-outcome', makeSureIs('sales agent'), salesAgentController.logMeetingOutcome);
// router.post('/sales-agent/add-reference', makeSureIs('sales agent'), salesAgentController.addReference);

//schedule routes
// router.route('/schedule/slot')
//     .post(makeSureIs('sales agent'), ScheduleController.addSlot);

//phone agent routes
// router.get('/phone-agent', makeSureIs('phone agent'), phoneAgentController.phoneAgentDashboard);
// router.get('/phone-agent/sales-agent-schedule', makeSureIs('phone agent'), phoneAgentController.getSalesAgentSchedule);

// GET/POST/DELETE /admin/user

// /admin/user/add
// /admin/user/delete
// /admin/user/edit

module.exports = router;