import {createContext} from 'react';

const contactContext = createContext(); 

//nitialize globally (we decide were to pass it without using props) available object, array, string, number, etc as a context value
//contextAPI, great way of avoiding passing data from component to component to component to... if we don't need them 
//in these in-between components. Great way of bypassing components and directly passing data from A to D.

export default contactContext;