
import express from 'express';
import { updateSeats,Bookings,getbooking } from '../controllers/Booking.js'

const Bookingrouterr = express.Router();

Bookingrouterr.post("/update", updateSeats);
Bookingrouterr.post("/book", Bookings);
Bookingrouterr.get("/bget", getbooking);
export default Bookingrouterr;
