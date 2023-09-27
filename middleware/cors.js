const express = require("express");
const cors = require("cors");

const corsMiddleware = new express.Router();

corsMiddleware.use(
  cors({
    origin: "*",
  })
);

module.exports = corsMiddleware;
