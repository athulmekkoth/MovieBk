import mongoose, { mongo } from "mongoose";

const Bookingschema = new mongoose.Schema({
    movieid:{
        type:mongoose.Schema.Types.ObjectId,

    },
    theaterid:{
        type:mongoose.Schema.Types.ObjectId,

    
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bookedSeats: {
    type: [Number],
     required: true 
    },
    date: {
        type: Date
    },
    slot: {
        type: String,
        required: true
    }
});

export default mongoose.model("Booking", Bookingschema);
