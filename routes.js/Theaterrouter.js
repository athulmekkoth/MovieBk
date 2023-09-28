
import express from 'express';
import { getAllTheaters, addTheater,getbylocation } from '../controllers/Theatercontoller.js';


const Theaterrouter = express.Router();

Theaterrouter.get("/getalltheater", getAllTheaters);
Theaterrouter.post("/addtheater", addTheater);
Theaterrouter.get("/getbylo", getbylocation);
export default Theaterrouter;
