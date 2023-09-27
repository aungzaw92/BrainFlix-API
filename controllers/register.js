const authService = require("../utils/authService");

// Handle API key creation
const createAPIKey = (req, res) => {
  const [API_KEY, id] = authService.generateKey();
  authService.storeKey(id, API_KEY);
  // Respond with the generated API key
  return res.status(200).json({
    message:
      "You have created a new API key. USAGE => headers: {'x-api-key': 'key'}",
    "x-api-key": API_KEY,
  });
};

module.exports = { createAPIKey };
