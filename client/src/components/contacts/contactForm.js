import React, { useState } from 'react' //HOOK

const contactForm = () => {

    //BASIC HOOK format: - useState() - const [state, setState] = useState(intialValue)
     //a single piece of state "contact" with all the fields 
    const [contact, setContact] = useState({  
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });
    
    //Pull the values out of contact
    const { name, email, phone, type } = contact; 

    //target specific oect to target 
    
    const onChange = e => setContact({ ...contact })
    
    return (
        <form>
            <h2 className="text-primary"></h2>
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
            />Personal {' '}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
            />Professional {' '}
            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default contactForm
