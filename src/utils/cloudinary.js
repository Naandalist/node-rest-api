const cloudinary = require("cloudinary").v2;
const config = require("../config");

cloudinary.config({
  cloud_name: config.cloudName, 
  api_key: config.apiKey,
  api_secret: config.apiSecret,
  cloudinary_url : config.cloudinaryUrl,
  secure: true
});
module.exports = cloudinary;

