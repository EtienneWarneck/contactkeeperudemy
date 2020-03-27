import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';



export default (state, action) => {
    switch (action.type) {

        case ADD_CONTACT:
            return {
                ...state, //current state. Immutable
                contacts: [...state.contacts, action.payload] //spread to copy what's there, action.payload = DATA
            };

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => 
                    //#4 map through all contacts and look for the payload id. If matches, will send the new updated info (action.payload), else 
                    contact.id === action.payload.id ? action.payload : contact)
            };

        case DELETE_CONTACT:
            return {
                ...state,
                //return all contacts that are not current id
                //filter out the specific contact
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };

        default:
            return state;
    }
}