import express from "express";
import { verifyAdmin } from "../../utils/verifyToken.js";
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, getCountByCity, getCountByType } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getHotel);

// GETALL
router.get("/", getAllHotels);


router.get("/countByCity", getCountByCity);

router.get("/countByType", getCountByType);

export default router;
