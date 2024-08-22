import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const URL = "http://localhost:5000/api/user/signup";


const useSignup = () => {
    const [error, setError] = useState(null) ;
    const [isLoading, setIsLoading] = useState(null) ;

    const { dispatch } = useContext(AuthContext) ;

    const signup = async(email, password) => {
        setIsLoading(true) ;
        setError(null) ;

        try {
            const response = await axios.post(URL, {email, password}) ;
            console.log(response.data) ;

            //save user to local storaage
            localStorage.setItem('user' , JSON.stringify(response.data) ) ;

            //update the auth context
            dispatch({type: 'LOGIN', payload: response.data }) ;

            setIsLoading(false) ;

        } catch (error) {
            
            setIsLoading(false);
            setError(error.response?.data?.Error || 'An error occurred during signup.');
        }
        
    }

    return { signup, isLoading, error } ;
}

export default useSignup