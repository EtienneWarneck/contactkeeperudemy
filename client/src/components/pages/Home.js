import React from 'react';
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/contactFilter'

const Home = () => {
    return (
        <div className="grid-2">
            <div>
               <ContactForm/> {/* input */}
            </div>
            <div>
                <ContactFilter />
                <Contacts/> {/* output */}
            </div>
        </div>
    )
}

export default Home;
