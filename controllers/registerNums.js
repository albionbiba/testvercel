const PhoneNumbers = require('../models/PhoneNumbers');

exports.registerNums = async(req, res) => {
  const { client, number } = req.body;
  console.log(req.body)
  try{
  const newNumEntry = new PhoneNumbers({
    client: client,
    number: number
  });

  await newNumEntry.save();
    res.status(201).json({status: true, message: 'Number registered successfully'});
}catch(error){
  console.error(error);
  res.status(500).json({status: false, message: 'Failed to register number'});
}
}