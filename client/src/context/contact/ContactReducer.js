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
                ...state, //return the current state, Immutable
                contacts: [...state.contacts, action.payload] //return a new array
                // new array: with spread operator to copy what was there before + action.payload = DATA
            };

        case UPDATE_CONTACT: //#3 reducer catches the payload 
            return {
                ...state,//current state. Immutable
                contacts: state.contacts.map(contact => // and maps through all of the contacts...
                    contact.id === action.payload.id ? action.payload : contact)// looks for the payload id. 
                //If matches, will send the new updated info (action.payload) and replace it, else original contact
            };

        case DELETE_CONTACT:
            return {
                ...state,//current state. Immutable
                //return all contacts that are not current id
                //filter out the specific contact
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
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
                    const regex = new RegExp(`${action.payload}`, `gi`)
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
            
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };

        default:
            return state;
    }
}