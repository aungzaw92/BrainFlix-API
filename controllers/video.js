const jsonService = require("../utils/jsonService");
const { randomUUID } = require("crypto");
const ip = require("ip");

// Mock data for post requests
const defaultVideoData = {
  views: "1,001,023",
  likes: "110,985",
  duration: "5:01",
  channel: "User Channel",
  image: "Upload-video-preview.jpg",
};

// Constants
const DATABASE_PATH = "../data/videos.json";
const BASE_URL = `http://${ip.address()}:${process.env.PORT}`;

// Get videos
const getVideos = (req, res) => {
  const data = jsonService.loadJSON(DATABASE_PATH);
  if (data) {
    let videos = data.map((video) => {
      const { id, title, channel, image } = video;
      return { id, title, channel, image: `${BASE_URL}/images/${image}` };
    });
    return res.status(200).json(videos);
  } else {
    return res.status(500).json({ message: "Server error, no videos found." });
  }
};

// Get video
const getVideo = (req, res) => {
  let { id } = req.params;
  const data = jsonService.loadJSON(DATABASE_PATH);
  if (data && id) {
    let [video] = data.filter((video) => {
      return video.id === id;
    });
    if (video) {
      return res
        .status(200)
        .json({ ...video, image: `${BASE_URL}/images/${video.image}` });
    } else {
      return res.status(400).json({ message: `No video found for id: ${id}.` });
    }
  }
};

// Post video
const postVideo = (req, res) => {
  const data = jsonService.loadJSON(DATABASE_PATH);
  const { title, description } = req.body;
  const newVideo = {
    id: randomUUID(),
    title,
    description,
    ...defaultVideoData,
    timestamp: new Date(),
  };

  // If some data is missing, return an error message
  const requiredFields = ["title", "description"];
  for (let field of requiredFields) {
    if (!newVideo[field]) {
      return res.status(400).json({ message: `Request body missing ${field}` });
    }
  }

  // Add video to the JSON file
  data.push(newVideo);
  jsonService.writeJSON(DATABASE_PATH, data);
  return res.status(201).json(newVideo);
};

module.exports = { getVideos, getVideo, postVideo };
