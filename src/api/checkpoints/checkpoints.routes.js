const express = require("express");
const Checkpoint = require("./checkpoint.model");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");
const { isCheckpoint } = require("../../middlewares/auth"); //todavía no lo estamos utilizando
const { isAdmin, isAuth } = require('../../middlewares/auth'); 

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const allCheckpoints = await Checkpoint.find();
      return res.status(200).json(allCheckpoints);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const checkpointToFind = await Checkpoint.findById(id);
      return res.status(200).json(checkpointToFind);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.get("/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const checkpointName = await Checkpoint.find({ name: name });
      return res.status(200).json(checkpointName);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.post("/create", /*[isAdmin],*/ upload.single("img"), async (req, res) => {
    try {
      const checkpoint = req.body;
      if (req.file) {
        checkpoint.img = req.file.path;
      }
      const newCheckpoint = new Checkpoint(checkpoint);
      const created = await newCheckpoint.save();
      return res.status(201).json(created);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.put("/edit/:id", /*[isAdmin],*/ upload.single("img"), async (req, res) => {
    try {
      const id = req.params.id;
      const checkpoint = req.body;
      const checkpointOld = await Checkpoint.findById(id);
  
      if (req.file) {
        deleteFile(checkpointOld.img);
        checkpoint.img = req.file.path;
      }
      const checkpointModify = new Checkpoint(req.body);
      checkpointModify._id = id;
      const checkpointUpdated = await Checkpoint.findByIdAndUpdate(id, checkpointModify);
      return res.status(201).json(checkpointUpdated);
    } catch (error) {
      return res.status(500).json("Error editing checkpoint");
    }
  });
  
  router.delete("/delete/:id", /*[isAdmin],*/ async (req, res) => {
    try {
      const id = req.params.id;
      const checkpointToDelete = await Checkpoint.findByIdAndDelete(id);
      return res
        .status(200)
        .json("checkpoint deleted correctly");
    } catch (error) {
      return res.status(500).json("Could not delete checkpoint");
    }
  });

  module.exports = router;