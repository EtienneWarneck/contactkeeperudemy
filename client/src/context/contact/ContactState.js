import React, { useReducer } from 'react'; //access state and dispatch
import { uuid, isUuid } from 'uuidv4'; //random id for hard coded
import ContactContext from './contactContext';
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

console.log(isUuid('75442486-0878-440c-9db1-a7006c25a39f'));

const ContactState = props => {

    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Jeremy Low",
                email: "j@gmail.com",
                phone: "111-111-1111",
                type: "personal"
            },
            {
                id: 2,
                name: "Katie Forall",
                email: "k@gmail.com",
                phone: "222-222-2222",
                type: "personal"
            },
            {
                id: 3,
                name: "Villy Salt",
                email: "v@gmail.com",
                phone: "333-333-3333",
                type: "professional"
            }
        ],
        current: null 
        //when Edit is clicked we want data to go in this piece of state and we can change UI based on that
    };

    //USE REDUCER HOOK -------------------------------------------------------------------------------------------------
    const [state, dispatch] = useReducer(contactReducer, initialState); //dispatch ("envoyer") objects to our reducer

    //ACTIONS 
    //Add contact
    const addContact = contact => {
        contact.id = uuid.v4(); //RandomID will be removed when we use MongoDB
        dispatch({ type: ADD_CONTACT, payload: contact }); //2 values sent to reducer: perform 1 action, sent 1 data
    };

    // //Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id }); // 2values sent to reducer
    };

    //Set Current Contact INTO FORM = Edit existing contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact }); //dispatch to reducer
    };

    //Clear Current Contact

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT }); // 2values sent to reducer
    };


    //Update Contact
 const updateContact = contact => { 
        dispatch({ type: UPDATE_CONTACT, payload: contact }); //#2 dispatch to the reducer 
    };


    //Filter Contacs


    //Clear Filter

    return ( //wrap entire app with this context
        <ContactContext.Provider value={
            {
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent, //to Edit existing contact
                clearCurrent,
                updateContact
            }}
        >
            {console.log("ContactState PAGE, state.contacts", state.contacts)}
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;