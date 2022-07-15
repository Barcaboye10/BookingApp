import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    name:{
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    distance:{
        type:String,
        required: true
    },
    photos: {
        type:String
    },
    title: {
        type:String,
        required:true
    },
    desc: {
        type:String,
        required:true
    },
    rating: {
        type:Number,
        min: 0,
        max: 5
    },
    rooms: {
        type:[String],
        ref: "Room"
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model("Hotel", hotelSchema)