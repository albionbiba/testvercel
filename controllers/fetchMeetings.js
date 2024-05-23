const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");
const User = require('../models/User');
const Meeting = require('../models/AgentMeeting_a');
exports.fetchMeetings = async (req, res) => {
  try{
    const salesAgentId = req.user._id;
    const salesAgent = await User.findById(salesAgentId);
    if(!salesAgent){
      return res.status(404).json({status: false, message: 'Sales agent not found'});
    }else{
      const meetings = await Meeting.find({agentId: salesAgentId});
      return res.status(200).json({status: true, meetings: meetings});
    }
  }catch(error){
    console.error(error);
    res.status(500).json({status: false, message: 'Failed to fetch sale agents meetings'});
  }
}