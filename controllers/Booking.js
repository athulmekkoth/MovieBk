import Movies from "../models/Movies.js";
import Booking from "../models/Booking.js"
import Theater from "../models/Theater.js";
import { response } from "express";


export const Bookings = async (req, res) => {
    try {
        const { name, email, phone, date, slot, seatnumber, movieid, theaterid } = req.body;

        if (!Array.isArray(seatnumber)) {
             res.status(400).json({ error: 'Seat number should be an array.' });
             return;
        }

        const movie = await Movies.findById(movieid);
        if (!movie) {
            res.status(404).json({ error: 'Movie not found.' });
            return;
        }

        const theater = await Theater.findById(theaterid).populate('movies');
        if (!theater) {
            res.status(404).json({ error: 'Theater not found.' });
            return;
        }

        const isMovieInThisTheater = theater.movies.some(m => m._id.equals(movie._id));
        if (!isMovieInThisTheater) {
            res.status(400).json({ error: 'The specified movie is not associated with the specified theater.' });
            return;
        }

 
        if (movie.seatsAvailable < seatnumber.length) {
            res.status(400).json({ error: 'Seats not available.' });
            return;
        }

        const ar1 = movie.seats.filter((ele) => seatnumber.includes(ele));

      if(ar1.length>0)
      {res.status(400).json({ error: 'Seats not available.' });
      return;

      }
      else{
        const newBooking = new Booking({
            name,
            email,
            phone,
            date,
            slot,
            bookedSeats:seatnumber,
            movieid: movieid,
            theaterid: theaterid,
        });


        const updatedSeats = [...movie.seats, ...seatnumber];
        await Movies.findByIdAndUpdate(movieid, { seats: updatedSeats });

       const resposne= await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully.' });
      }
     
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getbooking=async(req,res)=>{
    try{
        const response=await Booking.find()
        res.status(200).json(response)
    }catch(err)
    {
        res.status(500).json({ error: err.message });
    }
}




export const updateSeats = async (req, res) => {
    try {
        const { name, email, phone, newdate, newslot, newSeatNumbers, id } = req.body;
       
        if (!Array.isArray(newSeatNumbers)) {
            res.status(400).json({ error: 'New seat numbers should be an array.' });
            return;
            
        }

        const booking = await Booking.findById(id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found.' });
            return;
        }

        const theater = await Theater.findById(booking.theaterid).populate('movies');
        if (!theater) {
            res.status(404).json({ error: 'Theater not found.' });
            return;
        }

        const movie = theater.movies.find(m => m._id.equals(booking.movieid));
        if (!movie) {
            res.status(404).json({ error: 'Movie not found.' });
            return;
        }
        const items = movie.seats.filter(item => !booking.bookedSeats.includes(item));


        if ( newSeatNumbers.length>movie.seatsAvailable.length ) {
            res.status(400).json({ error: 'seat no unavailable' });
            return;
        }
        const data = movie.seats.filter(ele => newSeatNumbers.includes(ele));

        if (data.length > 0) {
            res.status(400).json({ error: 'One or more seats are already booked.' });
            return;
        }
        

        booking.name = name;
        booking.email = email;
        booking.phone = phone;
        booking.date = newdate;
        booking.slot = newslot;
        booking.bookedSeats = newSeatNumbers;

        
        await booking.save();

       
      
        const updatedSeats = [...items, ...newSeatNumbers];
        const updatedmovies=await Movies.findByIdAndUpdate(booking.movieid, { seats: updatedSeats });

        res.status(200).json({ updatedmovies});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
