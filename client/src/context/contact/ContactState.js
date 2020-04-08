import React, { useReducer } from 'react'; //access state and dispatch
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; //random id for hard coded
import ContactContext from './contactContext';
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

// console.log(uuidv4('75442486-0878-440c-9db1-a7006c25a39f')); //true 

const ContactState = props => {

    const initialState = {
        contacts: [

        ],
        current: null, //when Edit is clicked we want data to go in this piece of state and we can change UI based on that
        filtered: null //Array of filtered contacts that match an input
    };

    // HOOK useReducer()
    // sends actions to the switch statement
    // dispatch is a FUNCTION ("envoyer") objects 
    // An alternative to useState.
    // Returns the current state paired with a dispatch method. 
    // There are two different ways to initialize useReducer state.
    // The simplest way is to pass the initial state as a second argument:
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //ACTIONS 
    //Add LEFT side , BUTTON: Add Contact
    const addContact = async contact => { //
        // contact.id = uuidv4(); //RandomID will be removed when we use MongoDB
        const config = {
            headers: {
                'Content-Type': 'application/json'
                //token is set globally (setAuthToken.js)
            }
        }
        try {
            const res = await axios.post('api/contacts', contact, config);

            dispatch({ type: ADD_CONTACT, payload: res.data }) //now sending response to server
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
        // dispatch({ type: ADD_CONTACT, payload: contact }); //for hard coded data
        //2 values sent to reducer: perform 1 action, sent 1 data
    };

    // //Delete RIGHT side , BUTTON: Delete
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id }); // 2values sent to reducer
    };

    //Set Current RIGHT, BUTTON: Edit 
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact }); //dispatch to reducer
    };

    //Clear Current LEFT, BUTTON: Clear ONLY used when current = 
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT }); // 2values sent to reducer
    };

    //Update Contact
    const updateContact = contact => {  //#2. Once submitted, it's being called here. The state is passed in the parameter (contact) 
        dispatch({ type: UPDATE_CONTACT, payload: contact }); //Then it's going to dispatch the object to the reducer #3
    };


    //FILTER function
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER }); // resetting to null
    };



    return (
        //wrap entire app with the ContactContext OBJECT
        <ContactContext.Provider
            value={
                {
                    contacts: state.contacts,
                    current: state.current,
                    filtered: state.filtered,

                    addContact,
                    deleteContact,
                    setCurrent, //to Edit existing contact
                    clearCurrent,
                    updateContact,
                    filterContacts,
                    clearFilter
                }}
        >
            {console.log("ContactState.js, state.contacts", state.contacts)}
            {console.log("ContactState.js, state.current", state.current)}
            {console.log("ContactState.js, state.filtered", state.filtered)}

            {props.children}

            {console.log("ContactState, PROPS.CHILDREN:", props.children)}

        </ContactContext.Provider>
    )
}

export default ContactState;