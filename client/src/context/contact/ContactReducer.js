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
        default:
            return state;
    }
}