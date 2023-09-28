import express from 'express'; // Corrected the typo here
import mongoose from 'mongoose';
import Theaterrouter from './routes.js/Theaterrouter.js'; 
import bodyParser  from 'body-parser'
import Movierouter from './routes.js/Movierouter.js';
import Bookingrouterr from './routes.js/Bookingroute.js';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://localhost:27017/theater_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use("/theater", Theaterrouter);
app.use("/movie", Movierouter);
app.use("/booking", Bookingrouterr);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
