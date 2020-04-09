import React, { Fragment, useContext, useEffect } from 'react'; //HOOKS
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner'


const Contacts = () => {

    //Initialize context:
    const contactContext = useContext(ContactContext); //c C
    //now we can access any method associated with that const

    //Accessing contacts array, destructuring
    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) { //if no contacts...
        return <h4>Please add contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (<TransitionGroup>
                {filtered !== null
                    ? filtered.map(contact => ( //map through FILTERED contacts
                        <CSSTransition key={contact._id} timeout={500} classNames="item">
                            <ContactItem contactPassed={contact} />
                        </CSSTransition>
                    ))
                    : contacts.map(contact => ( //map through ALL contacts
                        <CSSTransition key={contact._id} timeout={500} classNames="item">
                            <ContactItem contactPassed={contact} />
                        </CSSTransition>
                    ))}
            </TransitionGroup>) : <Spinner />}
        </Fragment>
    )
}

export default Contacts
