import express from "express";
import Hotel from "../models/Hotel.js";
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
    console.log("Hotel saved");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    // {new: true} returns the updated Hotel, without these, hotel will be updated in DB, but response will have older data
    res.status(200).json(updatedHotel);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedHotel);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GETALL
router.get("/", async (req, res) => {
  try {
    const allHotels = await Hotel.find().select("name address rating cheapestPrice");
    res.status(200).json(allHotels);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
