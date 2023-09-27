const fs = require("fs");
const path = require("path");

// Open up and load JSON file.
const loadJSON = (filePath) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, filePath), "utf8"));

// Add data to JSON file.
const writeJSON = (filePath, data) =>
  fs.writeFileSync(
    path.join(__dirname, filePath),
    JSON.stringify(data),
    "utf8"
  );

module.exports = { loadJSON, writeJSON };
