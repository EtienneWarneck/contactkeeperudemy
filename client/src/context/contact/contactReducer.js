import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';



export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state, //return the current state, Immutable
                contacts: [action.payload, ...state.contacts], //return a new array
                // new array: with spread operator to copy what was there before + action.payload = DATA
                //action.payload gors first to have new contact on top of list (before and after reloading)
                loading: false
            };

        case UPDATE_CONTACT: //#3 reducer catches the payload 
            return {
                ...state,//current state. Immutable
                contacts: state.contacts.map(contact => // and maps through all of the contacts...
                    contact._id === action.payload._id ? action.payload : contact),// looks for the payload id. 
                //If matches, will send the new updated info (action.payload) and replace it, else original contact
                loading: false
            };

        case DELETE_CONTACT:
            return {
                ...state,//current state. Immutable
                //return all contacts that are not current id
                //filter out the specific contact
                contacts: state.contacts.filter(contact => contact._id !== action.payload), //action.payload is the ID
                loading: false
            };

        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            }

        case SET_CURRENT:
            return {
                ...state,//current state. Immutable
                current: action.payload
            };

        case CLEAR_CURRENT:
            return {
                ...state,//current state. Immutable
                current: null //
            };

        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, `gi`) //text in payload gi : a case insensitive search to match lowercase or uppercase
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}