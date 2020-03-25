import React, { useReducer } from 'react'; //access state and dispatch
import uuid from 'uuid'; //random id for hard coded
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

const ContactState = props => {

    const initialState ={
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
        ]
    };

    //initializing userReducer HOOK, passing initialState as a second argument
    const [state, dispatch] = useReducer(contactReducer, initialState); //dispatch objects to our reducer

        //ACTIONS
    //Add contact
    // const addContact = contact => {
    //     contact.id = uuid.v4();
    //     dispatch({ type: ADD_CONTACT, payload: contact});
    // };
    // //Delete contact
    // const deleteContact = id => {
    //     dispatch({ type: DELETE_CONTACT, payload: id});
    //Set Current Contact
    //Clear Current Contact
    //Update Contact
    //Filter Contacs
    //Clear Filter

    return ( //wrap entire app with this context
        <ContactContext.Provider value = {
            {contacts: state.contacts}
            } > {console.log("ContactState PAGE, state.contacts", state.contacts)}
        {props.children}
      </ContactContext.Provider>
    )
}

export default ContactState;