import {createContext} from 'react';

//Initialize globally (we decide where to pass it without using props) available object, array, string, number, etc as a context value.
//contextAPI: a great way of avoiding passing data from component to component to component to... if we don't need them 
//in these in-between components. Great way of bypassing components and directly passing data from A to D.
const contactContext = createContext(); 


export default contactContext;