import React, { Fragment, useContext } from 'react'; //HOOKS
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';



const Contacts = () => {

    //Initialize context:
    const contactContext = useContext(ContactContext); //c C
    //now we can access any method associated with that const

    //Accessing contacts array, destructuring
    // const { contacts, filtered } = contactContext;

    if (contactContext.length === 0) {
        return <h4>Please add contact</h4>
    }

    return (
        <div>
            <Fragment>

                {contactContext.filtered !== null ?

                    contactContext.filtered.map(contact => (
                        <ContactItem key={contact.id} contactPassed={contact} />))
                    :

                    contactContext.contacts.map(contact => (
                        <ContactItem key={contact.id} contactPassed={contact} />))
                }

            </Fragment>
        </div>
    )
}

export default Contacts
