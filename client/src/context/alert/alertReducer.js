import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (currentAlerts, action) => {

    switch (action.type) { //action is an object with a type  

        //case: code to execute for diff types of actions 

        //case #1 SET
        case SET_ALERT: 
            return [...currentAlerts, action.payloadAlert];
             //old array passed automatilcally (any alerts) + the data that is being dispatched from the action

        //case #2 REMOVE
        case REMOVE_ALERT:
            return currentAlerts.filter(alert => alert.id !== action.payloadAlert); 
            //Run logic on every alert. Comparing alert id with action id (). It should be equal

        default:
            return currentAlerts;
    }
}