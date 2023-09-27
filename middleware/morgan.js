const express = require("express");
const morgan = require("morgan");

const morganMiddleware = express.Router();

// Custom tokens
morgan.token("json", (req) => {
  if (req) {
    return `JSON: ${JSON.stringify(req.body)}`;
  }
  return " ";
});

morganMiddleware.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.json(req),
    ].join(" ");
  })
);

module.exports = morganMiddleware;
