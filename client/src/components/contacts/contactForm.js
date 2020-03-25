import React, { useState, useContext } from 'react'; //HOOK
import ContactContext from '../../context/contact/contactContext';
import { ADD_CONTACT } from '../../context/types';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    //BASIC HOOK format - useState() - monst important hook: const [state, setState] = useState(intialValue)
    //Used to add functionnality to functional component
    //Returns 2 elements: current state (then updated state) and a FUNCTION that allows us to update the state
    //to re-render the component. The function doesn not merge the content, it replaces it
    //Destructuring the array and name it whatever we want.
    //useState can be used as many times as we want. 
    //Multiple setState slices

    const [contact, setContact] = useState({  
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    // const [otherState, setOtherState] = useState('some other value')

    //Pull the values out of contact.
    const { name, email, phone, type } = contact; 
    
    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })
    
    const submitForm = (e) => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name: '',
        email: '',
        phone: '',
        type: 'personal'
        });
    };

    return (
        <form onSubmit={submitForm}>
            <h2 className="text-primary">Add contact</h2>
            <input
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input
                type="phone"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === 'personal'}
                onChange={onChange}
            />Personal {' '}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
                onChange={onChange}
            />Professional {' '}
            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default ContactForm;
