
import express from 'express';
import { updateSeats,Bookings } from '../controllers/Booking.js'

const Bookingrouterr = express.Router();

Bookingrouterr.get("/update", updateSeats);
Bookingrouterr.post("/book", Bookings);
export default Bookingrouterr;
