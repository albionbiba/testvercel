const User = require('../models/User');
const Role = require('../models/Role');

exports.fetchPhoneAgents = async(req, res)=>{
  try{
    const phoneAgentRole = await Role.findOne({title: 'phoneAgent'});
  if(!phoneAgentRole){
    return res.status(404).json({status: false, message: 'Phone agent role not found'});
  }

  console.log(phoneAgentRole._id)
  const phoneAgents = await User.find({ roleId: phoneAgentRole._id }).populate('roleId', 'name');
  const phoneAgentNames = phoneAgents.map(agent => agent.name);
  return res.status(200).json({status: true, phoneAgents:phoneAgentNames});
  }catch(error){
    console.error(error);
    res.status(500).json({status: false, message: 'Failed to fetch phone agents'});
  }

}