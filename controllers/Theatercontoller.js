import Theater from "../models/Theater.js"; 
export const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find().populate('movies');
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTheater = async (req, res) => {
  try {
 
    const { name, location, details } = req.body;

    const theater = new Theater({ name, location, details });
    await theater.save();

    res.json(theater);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getbylocation = async (req, res) => {
    try {
      const { location } = req.body;
      
      if (!location) {
        return res.status(400).json({ error: 'Location parameter is required.' });
      }
  
      const theaters = await Theater.find({ location });
      
      if (theaters.length > 0) {
        res.json(theaters);
      } else {
        res.json("No theaters found for the specified location.");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };