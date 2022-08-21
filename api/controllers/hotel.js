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
};

export const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedHotel);
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const allHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min | 1, $lte: max || 999 },
    })
      .limit(req.query.limit)
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
  }
};

export const getCountByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const getCountByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
