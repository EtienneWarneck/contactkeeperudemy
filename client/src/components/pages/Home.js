import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/contactFilter'
import AuthContext from '../../context/auth/authContext'


const Home = () => {

    const authContext = useContext(AuthContext);

    //as soon as the component loads, call loadUser
    //to look at the token and hit the backend, validate and put user into state
    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []); //only when component loads

    return (
        <div className="grid-2">
            <div>
                <ContactForm /> {/* input */}
            </div>
            <div>
                <ContactFilter />
                <Contacts /> {/* output */}
            </div>
        </div>
    )
}

export default Home;
