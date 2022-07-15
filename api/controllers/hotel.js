import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
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
}

export const deleteHotel = async (req, res, next) => {
    try {
      const deletedHotel = await Hotel.findByIdAndRemove(req.params.id);
      res.status(200).json(deletedHotel);
    } catch (err) {
      next(err);
    }
  }

export const getHotel = async (req, res, next) => {
    try {
      const getHotel = await Hotel.findById(req.params.id);
      res.status(200).json(getHotel);
    } catch (err) {
      next(err);
    }
  }

export const getAllHotels = async (req, res, next) => {
    try {
      const allHotels = await Hotel.find().select(
        "name address rating cheapestPrice"
      );
      res.status(200).json(allHotels);
    } catch (err) {
      next(err)
    }
  }