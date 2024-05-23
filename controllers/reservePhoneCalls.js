const ReservedCalls = require('../models/ReservedCalls');
const moment = require('moment');

exports.reserveCalls = async (req, res) => {
try{
  const {phoneNo, date, agent, client} = req.body;
  // const parsedDate = moment(date, 'DD/MM/YYYY', true); // Assuming date format is YYYY-MM-DD
  // console.log(phoneNo, date, agent, client);
  // if (!parsedDate.isValid()) {
  //   return res.status(400).json({ status: false, message: 'Invalid date format' });
  // }
  const timestamp = new Date(date);
  const formattedDate = timestamp.toISOString().split('T')[0];
  console.log(req.body);
  const newCallEntry = new ReservedCalls({
    number:phoneNo,
    datetime: formattedDate,
    assignedAgent: agent,
    reserved: true,
    client: client,
  });

  await newCallEntry.save();
    res.status(201).json({status: true, message: 'Call reserved successfully'});
}catch(error){
  console.error(error);
  res.status(500).json({status: false, message: 'Failed to reserve call'});
}
}