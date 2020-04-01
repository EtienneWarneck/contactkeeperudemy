import React, {useContext, useRef, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    const text = useRef(''); //initializing ref

    // const {filterContacts, clearFilter, filtered } = contactContext;
    
    useEffect(() => {
        if (contactContext.filtered === null) {
        text.current.value ='';
        }
    })

    const onChange = e => {
       if (text.current.value !== '') { //what's in input
        contactContext.filterContacts(e.target.value); //passing actual text 
       }
       else {
           contactContext.clearFilter();
       }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
        </form>
    )
}

export default ContactFilter;
