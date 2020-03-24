import React, {Fragment, useContext} from 'react'
import ContactContext from '../../context/contact/ContactContext';



const Contacts = () => {
    const ContactContext = useContext(ContactContext); //access to every action associated with context

    const {contacts } = contactContext;
    return (
        <div>
            <Fragment>
                {contacts.map(contact => (
                    <h3> {Contact.name}</h3>
                )
                )}
            </Fragment>


        </div>
    )
}

export default Contacts
