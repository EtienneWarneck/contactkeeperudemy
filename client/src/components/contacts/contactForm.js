import React, { useState, useContext, useEffect } from 'react'; //HOOK
import ContactContext from '../../context/contact/contactContext';
import { ADD_CONTACT } from '../../context/types';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    //BASIC HOOK - useState() - most important hook. FORMAT -> const [state, setState] = useState(intialValue)
    //Used to add functionnality to functional component
    //Returns 2 elements: current state (then updated state) and a FUNCTION that allows us to update the state
    //to re-render the component. The function doesn not merge the content, it replaces it
    //Destructuring the array and name it whatever we want.
    //useState can be used as many times as we want. 
    //Multiple setState slices
    const [contact, setContact] = useState({ //contact is the CHANGING STATE OF THE FORM
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    // const [otherState, setOtherState] = useState('some other value')

    const { addContact, updateContact, clearCurrent, current } = contactContext;

    // 
    //useEffect accepts a function that will run after and for every render cycle.
    useEffect(() => {
        if (current !== null) {
            setContact(current) //set LEFT form with contact
        } else {
            setContact({  //default state (nothing)
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]); //adding dependencies. useEffect will only be called if those change. ( similar to componentDidMount() )


    //Pull the values out of contact.
    const { name, email, phone, type } = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })

    const submitForm = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);//Add Contact from Edit button
        } else {
            updateContact(contact); //Whatever is in the Form  #1
        };
        // setContact({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     type: 'personal'
        // });
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    }



    return (
        <form onSubmit={submitForm}>
            {/* <h2 className="text-primary">Add contact</h2> */}
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
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

            <h5>Contact Type:</h5>
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
            />Professional

            <div>
                <input
                    type="submit"
                    // value="Add Contact"
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className="btn btn-primary btn-block"
                />

            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                        Clear
                </button>
                </div>
            )}

        </form>
    )
}

export default ContactForm;
