import express from "express"
import { createWorkout ,getSingleWorkout, getWorkouts, updateWorkout, deleteWorkout } from "../controllers/workoutController.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = express.Router() ;

// require auth for all workout routes
router.use(requireAuth) ;

//get all workouts
router.get('/' , getWorkouts) 

//get a particular workout
router.get('/:id' , getSingleWorkout)

//POST a new workout
router.post('/' , createWorkout)

//DELETE a workout
router.delete('/:id' , deleteWorkout)

//UPDATE a workout
router.patch('/:id' ,updateWorkout ) 


export default router