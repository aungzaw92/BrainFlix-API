const cors = require("cors");
const express = require("express");

const corsMiddleware = new express.Router();

corsMiddleware.use(
  cors({
    origin: "*",
  })
);

module.exports = corsMiddleware;
