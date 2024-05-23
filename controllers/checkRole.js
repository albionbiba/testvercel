// const mongoose = require('mongoose');
// const findOrCreate = require("mongoose-findorcreate");
const User = require('../models/User');
const Role = require('../models/Role');
exports.checkRole = async (req, res) => {
  try{
    if(req.isAuthenticated()){
      const userId = req.user._id;
      const user = await User.findById(userId).select('roleId');
      const role = user.roleId;
      const {roleName} = req.body;
      const roleNameDB = await Role.findById(role).select('title');
        console.log(roleNameDB.title);
          if(roleName === roleNameDB.title){
            return res.status(200).json({status: true});
          }else{
            return res.status(403).json({status: false, message: 'Unauthorized access'});
          }
    }else{
      return res.status(401).json({status: false, message: 'Not authenticated'});
    }
  }catch(error){
    console.error(error);
  }
}