import React, { useReducer } from 'react'; //access state and dispatch
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid'; //random id for hard coded
import ContactContext from './contactContext';
import contactReducer from "./contactReducer";
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

// console.log(uuidv4('75442486-0878-440c-9db1-a7006c25a39f')); //true 

const ContactState = props => {

    const initialState = {
        // contacts: [],
        contacts: null,
        current: null, //when Edit is clicked we want data to go in this piece of state and we can change UI based on that
        filtered: null, //Array of filtered contacts that match an input
        error: null
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

    //GET
    const getContacts = async () => { //no config bc not sending any body

        try {
            const res = await axios.get('/api/contacts'); //GET res

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            }) //still receiving body: all of the users contacts
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        };
    };


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

            dispatch({ type: ADD_CONTACT, payload: res.data }); //now sending response to reducer and to DB. Won't be seen on reload
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
        // dispatch({ type: ADD_CONTACT, payload: contact }); //for hard coded data
        //2 values sent to reducer: perform 1 action, sent 1 data
    };

    //Delete RIGHT side , BUTTON: Delete
    const deleteContact = async id => {
        // dispatch({ type: DELETE_CONTACT, payload: id }); 
        try {
            await axios.delete(`api/contacts/${id}`);

            dispatch({ type: DELETE_CONTACT, payload: id }); //now sending response to reducer and to DB. Won't be seen on reload
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    };

    //Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };





//Clear Contacts
const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
};

//Set Current RIGHT, BUTTON: Edit 
const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact }); //dispatch to reducer
};

//Clear Current LEFT, BUTTON: Clear ONLY used when current = 
const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT }); // 2values sent to reducer
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
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent, //to Edit existing contact
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
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