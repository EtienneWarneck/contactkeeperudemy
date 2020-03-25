import React, { Fragment, useContext } from 'react'; //HOOKS
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';



const Contacts = () => {

    //Initialize context:
    const contactContext = useContext(ContactContext); //c C
    //now we can access any method associated with that const

    //Accessing contacts array, destructuring
    const { contacts } = contactContext;


    return (
        <div>
            <Fragment>
                {contacts.map(contact => (
                    //convert js array from ContactState with js map function and to return JSX and to embed in Homepage
                    <ContactItem key={contact.id} contactPassed={contact} />
                ))}
            </Fragment>
        </div>
    )
}

export default Contacts
