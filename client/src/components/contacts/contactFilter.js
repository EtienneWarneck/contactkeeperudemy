import React, {useContext, useRef, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);

    const textForRef = useRef(''); //HOOK initializing function Ref that references an actual DOM object

    // const {filterContacts, clearFilter, filtered } = contactContext;
    
    //If filter is empty, we want the input to be empty
    useEffect(() => {
        if (contactContext.filtered === null) {
        textForRef.current.value ='';
        }
    })

    const onChange = e => {
       if (textForRef.current.value !== '') { //what's in input
        contactContext.filterContacts(e.target.value); //passing actual value of the input
       }
       else {
           contactContext.clearFilter();
       }
    }

    return (
        <form>
            <input ref={textForRef} type="text" placeholder="Filter Contacts..." onChange={onChange}/> 
        </form>
    )
}

export default ContactFilter;
