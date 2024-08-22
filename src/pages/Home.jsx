import React, { useEffect, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import WorkoutCard from "../components/WorkoutCard";
import "./Home.css"; // Import CSS for styling
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";

const URL = "http://localhost:5000/api/workouts";

const Home = () => {
  // const [workouts, setWorkouts] = useState([]);
  const { dispatch, workouts } = useContext(WorkoutContext);
  const [form, setForm] = useState({
    title: "",
    reps: "",
    load: "",
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getWorkouts = async () => {
      const token = user.token;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      };

      try {
        const response = await axios.get(URL, { headers });
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: "SET_WORKOUTS", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      getWorkouts();
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const token = user.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };

    try {
      const response = await axios.post(URL, form, { headers });
      console.log("Workout added:", response.data);
      dispatch({ type: "CREATE_WORKOUT", payload: response.data });

      setForm({ title: "", reps: "", load: "" });
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="workouts">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              id={workout._id}
              title={workout.title}
              reps={workout.reps}
              load={workout.load}
              time={workout.createdAt}
            />
          ))}
        </div>
        <div className="workoutForm">
          <form onSubmit={handleSubmit}>
            <h2>Add Workout</h2>
            <label htmlFor="title">Title:</label>
            <input
              value={form.title}
              onChange={handleChange}
              type="text"
              id="title"
              name="title"
              required
            />
            <label htmlFor="reps">Reps:</label>
            <input
              value={form.reps}
              onChange={handleChange}
              type="number"
              id="reps"
              name="reps"
              required
            />
            <label htmlFor="load">Load:</label>
            <input
              value={form.load}
              onChange={handleChange}
              type="number"
              id="load"
              name="load"
              required
            />
            <button type="submit">Add Workout</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
