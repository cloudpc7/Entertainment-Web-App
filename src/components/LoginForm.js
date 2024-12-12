import {Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import validator from 'validator';
import addUser from '../utilities/userAPI';
// testing gh-pages push
import '../styles/login/login.scss';

const LoginForm = () => {
    const [login, setLogin] = useState(true); // state variables for sign up and login form
    const [signUp, setSignUp] = useState(false);
    const [touched, setTouched] = useState({});
    const [errMsg, setErrMsg] = useState({});

    const [signUpData, setSignUpData] = useState({ // create sign up data object
        email: '',
        password:'',
        confirmPassword: '',
    });

    const [formData, setFormData] = useState({ // creat login form object
        email: '',
        password: '',
    });

    const handleToggleForm = () => { // handle logic for switching between forms login or signing up to account
        setSignUp(!signUp);
        setLogin(!login);

        setFormData({email: '', password:''}); // clear form data and sign up data if user switches between forms 
        setSignUpData({email: '', password: '', confirmPassword: '',}); //    and user has created  error messages on the form.
        setErrMsg({}); // clear error messages. 
        setTouched({}); // clear touched validation
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSubmit = signUp ? signUpData : formData; // logic to handle whether data is coming from signup form or
                                                                 // or login form
        try {

            await addUser(formDataToSubmit);
            console.log("User added successfully!"); // add user to database in json file

        } catch (error) {
            console.error(error);
        }

        if(signUp) {       // function to determine if usere is signing up or logging in 
            setSignUpData({
                email: '',  
                password: '',
                confirmPassword: '',
            });
        } else if (login) {
            setFormData({
                email: '',
                password: '',
            });
        }

        setTouched({});
        setErrMsg({});
        
    } // needs logic to confirm if user already has an account

    const handleBlur = (event) => {
        const { name, value } = event.target; // deconstruct variables from event.target
        setTouched({
            ...touched,
            [name]: true,
          });

          if (!value) { // validation if form fields are empty  first check
            setErrMsg({
                ...errMsg,
                [name]: "Can't be empty",
            });
        }   else if (name === "email") { // use validator to check email address logic
                if (!validator.isEmail(value)) {
                    setErrMsg({
                        ...errMsg,
                        [name]: "Invalid email format",
                    });
                }   else {
                        setErrMsg({
                            ...errMsg,
                            [name]: null,
                        });
                    }
            }   else if (name === "password") { // use validator for checking password integrity
                    if (!validator.isStrongPassword(value)) {
                        setErrMsg({
                            ...errMsg,
                            [name]: (
                                <ul>
                                    <li>At least 8 characters long</li>
                                    <li>At least one lowercase character</li>
                                    <li>At least one uppercase character</li>
                                    <li>At least one number</li>
                                    <li>At least one symbol</li>
                                </ul>
                            ),
                        });
                    } else {
                        setErrMsg({
                            ...errMsg,
                            [name]: null,
                        })
                    }
                }   else if (name === "confirmPassword") { // validate if confirm password field is the same is password
                        if (signUpData.password !== value) {
                            setErrMsg({
                                ...errMsg,
                                [name]: "Passwords must match",
                            });
                    }   else if (signUpData.password === value)  {
                            setErrMsg({
                                ...errMsg,
                                [name]: null,
                        });
                    }
                }
    }
    const handleChange = (event) => { // create form objects for sign up and login form
        const { name, value } = event.target;
        if(signUp) {
            setSignUpData({
                ...signUpData,
                [name]: value,
            });
        }   else if(login) {
                setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                })
            }
                
    }

    return (
        <div className="form-container">
            {
                signUp ? (
                    <h1 className="login-title h1">Sign Up</h1>
                )  : login &&(
                    <h1 className="login-title h1">Login</h1>
                ) 
            }
            
            
            <Form
                className="form" 
                onSubmit={handleSubmit}
                noValidate
            >
            {
                signUp ? (
                    <>
                        <Form.Group>
                            <Form.Control 
                                type="email" 
                                placeholder="Email address"
                                name="email"
                                value={signUpData.email}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                touched.email && errMsg.email && (
                                    <span type="invalid" className="error-message">
                                        {errMsg.email}
                                    </span>
                                )
                            }       
                        </Form.Group>
                        <Form.Group>     
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                value={signUpData.password}
                                name="password"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                touched.password && errMsg.password && (
                                    <span type="invalid" className="password-message">
                                        {errMsg.password}
                                    </span>
                                )
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                name="confirmPassword"
                                value={signUpData.confirmPassword}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                touched.confirm && errMsg.confirm && (
                                        <span type="invalid" className="confirm-message">
                                            {errMsg.confirm}
                                        </span>
                                    )
                            }
                        </Form.Group>
                            <Button
                                className="login-button" 
                                type="submit"
                                disabled={errMsg.email || errMsg.password || errMsg.confirmPassword}
                            >
                                Create an account
                            </Button> 
                            <p className="form-switch">Already have an account?
                                <span onClick={handleToggleForm}>Login</span>
                            </p>
                            
                    </>
                )   :   login && (
                    <>
                        <Form.Group>
                            <Form.Control 
                                type="email" 
                                placeholder="Email address"
                                name="email"
                                value={formData.email}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                touched.email && errMsg.email && (
                                    <span className="error-message" type="invalid">
                                        {errMsg.email}
                                    </span>
                                )
                            }
                        </Form.Group>
                        <Form.Group>
                            
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                touched.password && errMsg.password && (
                                    <span type="invalid" className="password-message">
                                        {errMsg.password}
                                    </span>
                                )
                            }
                        </Form.Group>
                        <Button
                            className="login-button" 
                            type="submit"
                            disabled={errMsg.email || errMsg.password || errMsg.confirmPassword} 
                        >
                            Login to your account
                        </Button>
                        <p className="form-switch">Dont have an account?
                            <span  onClick={handleToggleForm}>Sign Up</span> 
                        </p>
                          
                    </>
                )
            }
            </Form>
        </div>
    )
}

export default LoginForm;
