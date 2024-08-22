import express from "express";
const app = express();
import WorkoutRoutes from "./routes/workouts.js";
import UserRoutes from "./routes/user.js" ;
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config() ;

const MOGO_URL = "mongodb://localhost:27017/";

const PORT = 5000;

//middlewares
app.use(express.json());
app.use(cors()) ;

//routes
app.use("/api/workouts", WorkoutRoutes);
app.use("/api/user" , UserRoutes) ;

mongoose
  .connect(MOGO_URL)
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server running at port ${PORT} and connected to db`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
