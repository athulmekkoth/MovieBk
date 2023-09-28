
import Movies from "../models/Movies.js";
import Theater from "../models/Theater.js"; 
export const addMovie = async (req, res) => {
  try {
    const { title, duration, showTiming, rate, director, seatsAvailable } = req.body;

    const movie = new Movies({ title, duration, showTiming, rate, director, seatsAvailable });
    await movie.save();

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const linkmovie = async (req, res) => {
    try {
      const { theaterid, movieid } = req.body;
  
     
      const theater = await Theater.findById(theaterid);
  
      
      const movie = await Movies.findById(movieid);
  
    
      if (!theater || !movie) {
        return res.status(404).json({ error: 'Theater or movie not found.' });
      }
const result=theater.find
const movieIndex = theater.movies.indexOf(movieid);
if (movieIndex !== -1) {
  return res.status(400).json({ error: 'Movie is already linked to the theater.' });
}
      theater.movies.push(movie);
      await theater.save();
  
      res.json({ message: 'Movie associated with theater successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const getMoviesByName = async (req, res) => {
    try {
      const { name } = req.body;
      const movies = await Movies.find({ title: { $regex: new RegExp(name, 'i') } });
      
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  