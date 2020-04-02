import React, { useReducer } from 'react'; //access state and dispatch
import AuthContext from './authContext';
import authReducer from "./authReducer";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERR0RS,
} from '../types';

// console.log(uuidv4('75442486-0878-440c-9db1-a7006c25a39f')); //true 

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'), //access browser localStorage (vanilla JS)
        isAuthenticated: null, //are we logged in or not 
        loading: true, //
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

    //ACTIONS 

    //Load User (hit auth endpoint to check what user is logged in and get user data)

    //Register User (Sign user up and get token back)

    //Login User (Log in and get token)

    //Logout (destroy token)

    //Clear Errors



    return (
        //wrap entire app with the ContactContext OBJECT
        <AuthContext.Provider
            value={
                {
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                    loading: state.loading,
                    user: state.user,
                    error: state.error
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