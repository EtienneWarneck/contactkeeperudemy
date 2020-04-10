import React, { useReducer } from 'react'; //access state and dispatch
import AuthContext from './authContext';

import axios from 'axios';

import authReducer from "./authReducer";
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';

// import { ResponsiveEmbed } from 'react-bootstrap';
// import { compare } from 'bcryptjs';

// console.log(uuidv4('75442486-0878-440c-9db1-a7006c25a39f')); //true 

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'), //access browser localStorage (vanilla JS)
        isAuthenticated: null, //are we logged in or not 
        loading: true, //spinner 
        user: null,
        error: null
    };

    // HOOK useReducer() 
    // Preferable to useState when:
    // 1. you have complex state logic that involves multiple sub-values. 
    // 2. when the next state depends on the previous one.
    // It is a function that takes some input and returns some output
    // Passes 
    // sends actions to the switch statement
    // dispatch is a FUNCTION ("envoyer") objects 
    // Returns the current state paired with a dispatch method. 
    const [state, dispatch] = useReducer(authReducer, initialState);

    //ACTIONS: 

    //Load User (hit auth endpoint to check what user is logged in and get user data)
    const loadUser = async () => { //needs to be called in app.js to load every single time our main component loads
        //todo load token into global headers

        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth'); //routes check token, if ok:
            dispatch({
                type: USER_LOADED,
                payload: res.data //actual user data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            }) //
        }
    };


    // REGISTRATION (Sign user up and get token back and adds user to DB)
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/users', formData, config);
            //proxy so no need to write localhost5000 
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data //hitting route api user.js res.data will be the token

            });
            // console.log(res.data)

            loadUser();

        } catch (err) { //catch is called if error (if user already exists)
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg //calls json msg from user.js 400
            });
        }
    }

    //LOGIN (Log in and get token)
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    //LOGOUT (destroy token)
    const logout = () => dispatch({ type: LOGOUT });


    //CLEAR ERRORS
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });


    return (
        //wrap entire app with the ContactContext OBJECT
        <AuthContext.Provider
            value={
                {
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                    loading: state.loading,
                    user: state.user,
                    error: state.error,

                    register,
                    loadUser,
                    login,
                    logout,
                    clearErrors
                }}>

            {/* {console.log("ContactState PAGE, state.contacts", state.contacts)}
            {console.log("ContactState PAGE, state.current", state.current)}
            {console.log("ContactState PAGE, state.filtered", state.filtered)} */}

            {props.children}

            {/* {console.log("ContactState PAGE, props.children:", props.children)} */}

        </AuthContext.Provider>
    )
}

export default AuthState;