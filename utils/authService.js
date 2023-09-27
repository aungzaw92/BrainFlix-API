const { randomBytes, randomUUID } = require("crypto");
const jsonService = require("./jsonService");

const KEYS_PATH = "../data/keys.json";
const KEYS = jsonService.loadJSON(KEYS_PATH) || [];

// Creates a new API KEY
const generateKey = (size = 32, format = "base64") => {
  const buffer = randomBytes(size);
  return [buffer.toString(format).slice(0, -1), randomUUID()];
};

// Adds a key to the JSON file
const storeKey = (id, key) => {
  const obj = { id, key };
  KEYS.push(obj);
  jsonService.writeJSON(KEYS_PATH, KEYS);
};

// Checks if KEY exists within the JSON file
const validateKey = (key) => {
  const matches = KEYS.filter((obj) => {
    return obj.key === key;
  });
  return matches.length > 0;
};

module.exports = { generateKey, storeKey, validateKey };
