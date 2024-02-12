const { chatGPTResponse } = require('../services/openai'); // Adjust the path as necessary

// Assuming calculateDateDiff and getPaceLabel are defined here or imported
const calculateDateDiff = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

const getPaceLabel = (pace) => {
  const paceMapping = {
    fast: 'fast-paced',
    medium: 'moderately-paced',
    slow: 'relaxed-paced',
  };
  return paceMapping[pace] || 'moderately-paced';
};

// generatePrompt moved here for clarity and to ensure it has access to helper functions
const generatePrompt = (req) => {
  const { country, endDate, pace, startDate, travelers } = req.body;
  return `Plan a ${calculateDateDiff(startDate, endDate)} days trip to ${country} for ${travelers} people, pace should be ${getPaceLabel(pace)} and give me an overall cost estimate at the end.`;
};

// Controller function to handle the request
exports.fetchItinerary = async (req, res) => {
  try {
    const prompt = generatePrompt(req);
    const response = await chatGPTResponse(prompt); // Adjusted to pass prompt directly
    if (response) {
      res.json({ success: true, itinerary: response });
    } else {
      res.status(404).json({ success: false, message: 'Itinerary could not be generated.' });
    }
  } catch (error) {
    console.error('Error fetching itinerary: ', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }
};
