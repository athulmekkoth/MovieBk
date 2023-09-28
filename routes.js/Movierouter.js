
import express from 'express';
import { addMovie,linkmovie,getMoviesByName } from '../controllers/Movieadd.js'

const Movierouter = express.Router();

Movierouter.post("/addmovie", addMovie);
Movierouter.post("/link", linkmovie);
Movierouter.get("/get", getMoviesByName);
export default Movierouter;
