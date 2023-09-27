const express = require("express");
const registerController = require("../controllers/register");

const router = express.Router();

router.get("/", (req, res) => {
  return registerController.getKey(req, res);
});

module.exports = router;
