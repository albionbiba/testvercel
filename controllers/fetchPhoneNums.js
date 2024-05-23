const PhoneNums = require('../models/PhoneNumbers');

exports.fetchPhoneNums = async (req, res) => {
  try{
    const phoneNums = await PhoneNums.find({}, "number").exec();
    res.json({status: true, phoneNums});
  }catch(error){
    console.error(error);
    res.status(500).json({status: false, message: 'Failed to fetch phone numbers'});
  }
}