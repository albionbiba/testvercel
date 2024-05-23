const reservedCalls = require('../models/ReservedCalls');

exports.fetchReservedCalls = async (req, res)=> {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Set the limit of documents per page, default to 10 if not specified

  try {
    const count = await reservedCalls.countDocuments({ reserved: true }); // Count total reserved calls

    const totalPages = Math.ceil(count / limit); // Calculate total pages based on total count and limit
    const skip = (page - 1) * limit; // Calculate the number of documents to skip based on page and limit

    const calls = await reservedCalls.find({ reserved: true }).skip(skip).limit(limit).exec(); // Fetch reserved calls with pagination

    res.status(200).json({
      status: true,
      reservedCalls: calls,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: 'Server error' });
  }
}
