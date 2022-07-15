import express from "express";
import { verifyAdmin } from "../../utils/verifyToken.js";
import { createRoom, deleteRoom } from "../controllers/room.js";
const router = express.Router();

// CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

// DELETE
router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom);

export default router;
