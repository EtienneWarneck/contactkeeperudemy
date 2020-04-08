import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contactPassed }) => {   //{contactPassed} is the prop passed in from Contacts.js

//USE CONTEXT
    const contactContext = useContext(ContactContext); //holds all the data
    // console.log("ContactItem PAGE, useContext(), ALL CONTACTS", contactContext)
    
    const { deleteContact, setCurrent, clearCurrent } = contactContext; //create an action
    
    const { _id, name, email, phone, type } = contactPassed; //destructuring, EACH CONTACT
    // console.log("ContactItem PAGE, contactPassed, CONTACT #", contactPassed.id, contactPassed);
    
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>

            <h3 className='text-primary text-left'>
                {name}{' '} {/* add space between fname and lname*/}
                <span
                    style={{ float: 'right' }}
                    className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>

                    {type.charAt(0).toUpperCase() + type.slice(1)} {/*first letter uppercase*/}
                </span>
            </h3>

            <ul className="list">
                {/* if there's an email */}
                {email && (<li>
                    <i className="far fa-envelope"></i>  {email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone"></i> {phone}
                </li>)}
            </ul>

            <p>
                <button className="btn btn-dark btn-sm" onClick={ () => setCurrent(contactPassed)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>

        </div>
    );
};

ContactItem.propTypes = { contactPassed: PropTypes.object.isRequired };

export default ContactItem;