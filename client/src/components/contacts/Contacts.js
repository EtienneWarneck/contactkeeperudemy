import React, { Fragment, useContext } from 'react'; //HOOKS
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';


const Contacts = () => {

    //Initialize context:
    const contactContext = useContext(ContactContext); //c C
    //now we can access any method associated with that const

    //Accessing contacts array, destructuring
    // const { contacts, filtered } = contactContext;

    if (contactContext.length === 0) { //if no contacts...
        return <h4>Please add contact</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {contactContext.filtered !== null ?
                    contactContext.filtered.map(contact => ( //map through FILTERED contacts
                        <CSSTransition key={contact.id} timeout={500} classNames="item">
                            <ContactItem contactPassed={contact} />
                        </CSSTransition>
                    ))
                    : contactContext.contacts.map(contact => ( //map through ALL contacts
                        <CSSTransition key={contact.id} timeout={500} classNames="item">
                            <ContactItem contactPassed={contact} />
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
