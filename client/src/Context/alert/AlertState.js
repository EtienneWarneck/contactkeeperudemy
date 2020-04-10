import React, { useReducer } from 'react'; //access state and dispatch
import { v4 as uuidv4 } from 'uuid'; //random id for hard coded

import AlertContext from './alertContext';
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {

    const initialState = [] //initially current state is an empty array for alerts

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //ACTIONS 
    //Set an alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuidv4();
        dispatch({ //send to reducer
            type: SET_ALERT,
            payloadAlert: { msg, type, id }
        });
        //make alert disappear after certain time:
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payloadAlert: id }), timeout)
    }

    return (
        <AlertContext.Provider
            value={
                {
                    alertsToSend: state, //entire array is our state
                    setAlert
                }}>

            {/* {console.log("AlertState, alerts", state)} */}

            {props.children}

            {/* {console.log("ContactState, props.children:", props.children)} */}

        </AlertContext.Provider>
    )
}

export default AlertState;