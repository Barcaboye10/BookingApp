import express from "express";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";
import hotelsRoute from "./api/routes/hotels.js";
import roomsRoute from "./api/routes/rooms.js";
import cookieParser from "cookie-parser";
// const authRoute = require('./api/routes/auth');

const app = express();

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://geekyFutbolist:" +
        process.env.MONGO_ATLAS_PW +
        "@cluster0.tbtvzsb.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// To parse request body.
app.use(express.json());

// cookie-parser is a middleware which parses cookies attached to the client request object
app.use(cookieParser())

//middlewares
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

// This middleware is executed whenever "next(err)" is executed anywhere in above middlewares, as this is the 'next' middleware.
// It handles the errors being thrown.
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    message: errorMessage,
    status: errorStatus,
  })
  // return res.status(500).json("Hello from errorHandler middleware")
});

mongoose.connection.on("disconnected", () => {
  console.log("DB disconnected");
});

app.listen(3000, () => {
  mongoDBConnect();
  console.log("Connected to backend");
});
// D:\BookingApp\api\routes\auth.js
