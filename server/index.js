
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/', (req, res) => {
  res.send ("Hello to memories API from Wes ")
} )

// now that the database is our personal one network security needs to be set up for the application (allow the ip)
const CONNECTION_URL = 'mongodb+srv://group8:Ashisstupid23@cluster0.lvg4p5o.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// Error check to ensure database is connected to the server
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);