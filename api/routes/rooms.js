import express from 'express';
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello from Rooms")
})

export default router;