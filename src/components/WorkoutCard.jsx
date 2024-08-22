import React, { useContext } from "react";
import "./WorkoutCard.css"; // Import CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { WorkoutContext } from "../context/WorkoutContext";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO"; // If your time is in ISO format, you might need to parse it
import { AuthContext } from "../context/AuthContext";

const URL = "http://localhost:5000/api/workouts";

const WorkoutCard = ({ id, title, reps, load, time }) => {
  // key is actually workout._id passed from Home.jsx

  const { dispatch } = useContext(WorkoutContext);

  const { user } = useContext(AuthContext);

  if (!user) {
    return;
  }

  const handleDelete = async () => {
    console.log(id);

    const token = user.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };

    const response = await axios.delete(`${URL}/${id}` , { headers });

    if (response.status === 200) {
      dispatch({ type: "DELETE_WORKOUT", payload: response.data });
    } else {
      console.log(id);
      console.log(response);
    }
  };

  // Format createdAt time to display relative time
  const formattedTime = formatDistanceToNow(parseISO(time), {
    addSuffix: true,
  });

  return (
    <div className="workout-card">
      <h2>{title}</h2>
      <p>
        <strong>Reps:</strong> {reps}
      </p>
      <p>
        <strong>Load:</strong> {load}
      </p>
      <p>Created {formattedTime}</p>
      <button className="delete-button" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default WorkoutCard;
