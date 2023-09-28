
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  showTiming: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  seats: {
    type: [Number],
    default: [],
  },
     
  
  
});

export default  mongoose.model('Movie', movieSchema);



