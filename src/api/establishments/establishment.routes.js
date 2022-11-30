const express = require("express");
const Establishment = require("./establishment.model");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");
const { isEstablishment } = require("../../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const allEstablishment = await Establishment.find();
      return res.status(200).json(allEstablishment);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const establishmentToFind = await Establishment.findById(id);
      return res.status(200).json(establishmentToFind);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.get("/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const establishmentName = await Establishment.find({ name: name });
      return res.status(200).json(establishmentName);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.post("/create", [isAdmin], upload.single("img"), async (req, res) => {
    try {
      const establishment = req.body;
      if (req.file) {
        establishment.img = req.file.path;
      }
      const newEstablishment = new Establishment(establishment);
      const created = await newEstablishment.save();
      return res.status(201).json(created);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.put("/edit/:id", [isAdmin], upload.single("img"), async (req, res) => {
    try {
      const id = req.params.id;
      const establishment = req.body;
      const establishmentOld = await Establishment.findById(id);
  
      if (req.file) {
        deleteFile(establishmentOld.img);
        establishment.img = req.file.path;
      }
      const establishmentModify = new Establishment(req.body);
      establishmentModify._id = id;
      const establishmentUpdated = await Establishment.findByIdAndUpdate(id, establishmentModify);
      return res.status(201).json(establishmentUpdated);
    } catch (error) {
      return res.status(500).json("Error editing establishment");
    }
  });
  
  router.delete("/delete/:id", [isAdmin], async (req, res) => {
    try {
      const id = req.params.id;
      const establishmentToDelete = await Establishment.findByIdAndDelete(id);
      return res
        .status(200)
        .json("Establishment deleted correctly");
    } catch (error) {
      return res.status(500).json("Could not delete establishment");
    }
  });