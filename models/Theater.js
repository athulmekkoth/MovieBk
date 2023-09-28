// models/Theater.js
import mongoose, { mongo } from 'mongoose';

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
 
  details: {
    type: String,
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  shows:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shows',
  }]
});

export default mongoose.model('Theater',theaterSchema)