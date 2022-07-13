import express from "express";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";
import hotelsRoute from "./api/routes/hotels.js";
import roomsRoute from "./api/routes/rooms.js";
// const authRoute = require('./api/routes/auth');

const app = express();

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://geekyFutbolist:" +
        process.env.MONGO_ATLAS_PW +
        "@cluster0.tbtvzsb.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to DB")
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// To parse request body.
app.use(express.json());

//middlewares
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
})



app.listen(3000, () => {
    mongoDBConnect();
  console.log("Connected to backend");
});
// D:\BookingApp\api\routes\auth.js