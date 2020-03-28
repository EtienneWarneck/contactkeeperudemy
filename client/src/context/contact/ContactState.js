import React, { useReducer } from 'react'; //access state and dispatch
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
    CLEAR_FILTER
} from '../types';

// console.log(uuidv4('75442486-0878-440c-9db1-a7006c25a39f')); //true 

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
        current: null //when Edit is clicked we want data to go in this piece of state and we can change UI based on that
    };

    // HOOK useReducer()
    // sends actions to the switch statement
    // dispatch is a FUNCTION ("envoyer") objects 
    // An alternative to useState.
    // Returns the current state paired with a dispatch method. 
    const [state, dispatch] = useReducer(contactReducer, initialState);

    

        //ACTIONS 
            //Add LEFT side , BUTTON: Add Contact
    const addContact = contact => { //
        contact.id = uuidv4(); //RandomID will be removed when we use MongoDB
        dispatch({ type: ADD_CONTACT, payload: contact }); //2 values sent to reducer: perform 1 action, sent 1 data
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
 const updateContact = contact => {  //#2. Once submitted, it's being called here. The state (contact) is passed in.
        dispatch({ type: UPDATE_CONTACT, payload: contact }); //Then it's going to dispatch the object to the reducer #3
    };


    //Filter Contacs


    //Clear Filter

    return ( 
        //wrap entire app with this context OBJECT
        <ContactContext.Provider 
        value = {
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
            {/*  */}

            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;