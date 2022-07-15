import express from "express";
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../../utils/verifyToken.js";
const router = express.Router();

import { updateUser } from "../controllers/user.js";

// router.get("/checkAuth", verifyToken, (req, res) => {
//   res.send("Hello user, token exists, and it's verified");
// });

// router.get("/checkAuth/:id", verifyUser, (req, res) => {
//   res.send(
//     "Hello user, token exists, verified, user verified to be owner or Admin"
//   );
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res) => {
//   res.send("Hello Admin, token exists, verified, user verified to be Admin");
// });

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
// router.delete("/:id", verifyUser, deleteUser);

// // GET
// router.get("/:id", verifyUser, getUser);

// // GETALL
// router.get("/", verifyAdmin, getAllUsers);

export default router;
