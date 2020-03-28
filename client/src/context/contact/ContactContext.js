import {createContext} from 'react';

const contactContext = createContext(); 

// Creates a Context OBJECT. 

// When React renders a component that subscribes to this Context object it will read 
// the current context value from the closest matching PROVIDER above it in the tree.

//Initializes globally (we decide where to pass it without using props) 
// available objects, arrays, strings, number, etc as a context value.

//contextAPI: a great way of avoiding passing data from component to component to component to... if we don't need them 
//in these in-between components. Great way of bypassing components and directly passing data from A to D.

export default contactContext;