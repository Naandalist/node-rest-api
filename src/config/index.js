const path = require("path");
require("dotenv").config();

module.exports = {
  rootPath: path.resolve("__dirname", ".."),
  port: process.env.PORT,
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  urlDbProd: process.env.MONGO_UDL_PROD,
  urlDbLocal: process.env.MONGO_URL_LOCAL,
  cloudinaryUrl: process.env.CLOUDINARY_URL,
  cloudinaryStoredFolder: process.env.CLOUDINARY_STORED_FOLDER
};
