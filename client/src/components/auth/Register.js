import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    //initialize AlertContext
    const alertContext = useContext(AlertContext);
    //initializing AuthContext
    const authContext = useContext(AuthContext);

    //Pulling out setAlarm from alertContext
    const { setAlert } = alertContext;

    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, clearErrors, isAuthenticated, props.history])


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user; //destructure to use them as variables

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();

        //VALIDATION
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else if (password.length < 6) {
            setAlert('Passwords needs 6 characters', 'danger')
        } else {
            // console.log('Register submit');
            //calling register
            register({
                name,
                email,
                password
            })
        }
    };


    return (

        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>

            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    {/* <input type='text' name='name' value={name} onChange={onChange} required /> */}
                    <input type='text' name='name' value={name} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    {/* <input type='email' name='email' value={email} onChange={onChange}  /> */}
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    {/* <input type='password' name='password' value={password} onChange={onChange} required minLength="6" /> */}
                    <input type='password' name='password' value={password} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    {/* <input type='password' name='password2' value={password2} onChange={onChange} required minLength="6" /> */}
                    <input type='password' name='password2' value={password2} onChange={onChange} />
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>

        </div>
    )
}

export default Register
