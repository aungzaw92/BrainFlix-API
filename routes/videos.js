const express = require("express");
const videoController = require("../controllers/video");

const router = express.Router();

// Get videos
router.get("/", (req, res) => {
  return videoController.getVideos(req, res);
});

// Get video
router.get("/:id", (req, res) => {
  return videoController.getVideo(req, res);
});

// Upload video
router.post("/", (req, res) => {
  return videoController.postVideo(req, res);
});

module.exports = router;
