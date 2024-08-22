import  { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { WorkoutContext } from '../context/WorkoutContext';

const useLogout = () => {
  
    const { dispatch : authDispatch } = useContext(AuthContext) ;
    const  { dispatch : workoutDispatch} = useContext(WorkoutContext) ;

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user') ;

        //dispatch logout action
        authDispatch({type : 'LOGOUT'}) ;
        workoutDispatch({type: 'SET_WORKOUTS' , payload : [] }) ;
    }

    return {logout} ;
}

export default useLogout