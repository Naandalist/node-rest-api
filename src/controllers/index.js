const User = require("../models");
const cloudinary = require("../utils/cloudinary");
const config = require("../config");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { fullname, username, email } = req.body;

      const user = new User({ fullname, username, email });
      await user.save();

      res.status(201).json({ message: "success create new user", data: user });
    } catch (error) {
      res.status(401).json({ message: "fail create new user", error: error });
    }
  },
  getUsers: async (req, res) => {
    try {
      const user = await User.find();

      res.status(200).json({
        message: user.length < 1 ? "no users found" : "success get all users",
        data: user || [],
      });
    } catch (error) {
      res.status(401).json({ message: "fail get users", error: error });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });

      if (user === null || !user) throw error;

      res.status(200).json({ message: "success get a user", data: user });
    } catch (error) {
      res.status(401).json({ message: "fail get users", error: error });
    }
  },
  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { fullname, username, email } = req.body;

      const isUserExist = await User.findById({ _id: id });

      // Validate is user exist by id
      if (!isUserExist || isUserExist === null) {
        return res.status(404).json({
          error: `User with id ${id} doesnt exist`,
          message: "update user",
        });
      } else {
        //Check req.file when user is confirmed exist
        if (req.file) {
          try {
            // Upload image to cloudinary

            if (isUserExist.avatar._id) {
              await cloudinary.uploader.destroy(isUserExist.avatar._id);
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
              folder: config.cloudinaryStoredFolder,
              transformation: { width: 800, crop: "pad" },
            });
            // Update selected user by id in database
            const updatedUser = await User.findOneAndUpdate(
              { _id: id },
              {
                fullname,
                username,
                email,
                avatar: { _id: result.public_id, url: result.secure_url },
              },
              { new: true, runValidators: true }
            );

            res.status(200).json({
              message: "update user with its avatar success",
              data: { updatedUser, uploadedAvatar: result },
            });
          } catch (err) {
            res.status(401).json({
              message: "Fail to update user with its avatar",
              error: err,
            });
          }
        } else {
          const user = await User.findOneAndUpdate(
            { _id: id },
            {
              fullname,
              username,
              email,
            },
            { new: true, runValidators: true }
          );

          res.status(201).json({ message: "update user success", data: user });
        }
      }
    } catch (error) {
      res.status(401).json({ message: "fail get users", error: error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      // Find user by id
      let user = await User.findById({ _id: req.params.id });

      if (user.avatar._id) {
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(user.avatar._id);
      }
      // Delete user from db
      await user.remove();
      res
        .status(200)
        .json({ message: `user with id ${req.params.id} success deleted` });
    } catch (error) {
      res.status(401).json({ message: "fail delete users, " + error });
    }
  },
};

// router.delete("/:id", async (req, res) => {
//   try {
//     // Find user by id
//     let user = await User.findById({ _id: req.params.id });
//     // Delete image from cloudinary
//     await cloudinary.uploader.destroy(user.cloudinary_id);
//     // Delete user from db
//     await user.remove();
//     res
//       .status(200)
//       .json({ message: `user with id ${req.params.id} success deleted` });
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({ message: err });
//   }
// });
