import { useReducer, createContext } from "react";

const WorkoutContext = createContext();

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(workout => workout._id !== action.payload._id),
      };
    default:
      return state;
  }
};

const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: [],
  });

  return (
    <WorkoutContext.Provider value={{ dispatch, ...state }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutContextProvider };
