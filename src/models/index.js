const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: [true, "Fullname is required!"],
    },
    username: {
      type: String,
      require: [true, "username is required!"],
    },
    email: {
      type: String,
    },
    avatar: {
      _id: {
        type: String,
      },
      url: {
        type: String,
        default:
          "https://as2.ftcdn.net/v2/jpg/03/59/58/91/1000_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg",
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
