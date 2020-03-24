import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from "./ContactReducer";
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
                name: "Jeremy",
                email: "j@gmail.com",
                phone: "111-111-1111",
                type: "personal"
            },
            {
                id: 2,
                name: "Katie",
                email: "k@gmail.com",
                phone: "222-222-2222",
                type: "personal"
            },
            {
                id: 3,
                name: "Villy",
                email: "v@gmail.com",
                phone: "333-333-3333",
                type: "professional"
            }
        ]
    };

    //initializing userReducer hook, passing initialState as a second argument
    const [state, dispatch] = useReducer(contactReducer, initialState); 

    //Add contact
    //Delete contatct
    //Set Current Contact
    //Clear Current Contact
    //Update Contact
    //Filter Contacs
    //Clear Filter

    return ( //wrap entire app with this context
        <ContactContext.Provider value ={{contacts: state.contacts}} > 
        {props.children}
      </ContactContext.Provider>
    )
}

export default ContactState;