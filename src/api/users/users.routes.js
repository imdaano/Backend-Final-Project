const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const upload = require('../../middlewares/file')
const { generateSign } = require("../../utils/jwt/jwt");
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.get("/", /*[isAuth],*/ async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json("Error in search user");
  }
});

router.get("/id/:id", /*[isAuth],*/ async (req, res) => {
  try {
    const id = req.params.id;
    const userById = await User.findOne().lean().populate('books');
    return res.sendStatus(200).json(userById);
  } catch (error) {
    return res.statuts(500).json("Error getting user");
  }
});


router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    if (newUser.rol === "user") {
      const created = await newUser.save();
      return res.status(201).json(created);
    } else {
      return res
        .status(500)
        .json("You are not authorized to be an admin.");
    }
  } catch (error) {
    return res.status(500).json("Error creating user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    if (!userDB) {
      return res.status(404).json("The user does not exist");
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.email);
      return res.status(200).json({ token, userDB });
    } else {
      return res.status(404).json("Incorrect password");
    }
  } catch (error) {
    return res.status(500).json("Error accessing");
  }
});

router.post("/logout/:name", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json("Error logging out");
  }
});

router.put("/edit/:id", /*[isAdmin],*/ upload.single("photo"), async (req, res) => {
  try {
    const id = req.params.id
    const user = req.body;
    const userOld = await User.findById(id);

    if (req.file) {
      deleteFile(userOld.photo);
      user.photo = req.file.path;
    }
    const userModify = new User(user);
    userModify._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, userModify);
    return res.status(200).json({message: "User has been successfully updated", userModified: userUpdated});
  } catch (error) {
    return res.status(500).json("Error editing user");
  }
});


router.delete("/delete/:name", [isAdmin], async (req, res) => {
  try {
    const name = req.params.name;
    const userToDelete = await User.findOne(name);
    return res.status(200).json("User has been successfully deleted");
  } catch (error) {
    return res.status(500).json("User could not be deleted");
  }
});

router.post('/checkSession', [isAuth],  async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json("Problem checking session");
  }
})

module.exports = router;