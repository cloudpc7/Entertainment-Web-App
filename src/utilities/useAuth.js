import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createUser, loginUser } from '../utilities/userAPI';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

export const useAuth = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    // error messages states
    const [ message, setMessage ] = useState({
        email: '',
        password: '',
        confirm: '',
        signup: '',
        login: '',
        account: '',
    });

    // error message handling states
    const [feedback, setFeedback] = useState({
        email: false,
        password: false,
        confirm: false,
    });

    // application login states
    const [user, setUser] = useState(null);
    // state to set if user has successfully logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // states for handling if user is logging in or signing up
    const [login, setLogin] = useState(true);

    const [signUp, setSignUp] = useState(false);
    
    const [formData, setFormData] = useState({
        signUp: {
            email: '',
            password: '',
            confirm: '',
        },
        login: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const clearForm = () => {
        setMessage({
            email: '',
            password: '',
            confirm: '',
            signup: '',
            login: '',
        });

        setFormData({
            signUp: {
                email: '',
                password: '',
                confirm: '',
            },

            login: {
                email: '',
                password: '',
            }
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password, confirm } = signUp ? formData.signUp : formData.login
        try {
            if (signUp) {
                for (const key in message) {
                    if(message[key]) {
                        return;
                    }
                }
                
                const result = await createUser(auth, email, password, confirm) ;
                if (result instanceof Error) {
                    if (result.code === 'auth/email-already-in-use') {
                        setMessage((prev) => ({
                            ...prev,
                            signup: 'Email already in use',
                        })); 
                    }
                    return;
                } else {
                    setMessage((prev) => ({
                        ...prev,
                        account: 'account created'
                    }))
                    clearForm();
                    navigate('/login');
                    setSignUp((prev) => !prev);
                    setLogin((prev) => !prev);
                }
            }   else {
                    const result = await loginUser(auth, email, password);
                    if (result instanceof Error) {

                        if(result.code === 'auth/invalid-credential') {
                            setMessage((prev) => ({
                                ...prev,
                                login: 'invalid credentials',
                            }));
                        } else if (result.code === 'auth/missing-password') {
                            setMessage((prev) => ({
                                ...prev,
                                login: 'please provide a password'
                            }))
                        }
                        return;
                    }

                    setIsLoggedIn(true);
                    clearForm();
                }
    
        } catch (error) {
            console.error('Error creating user:',error);
        }
    };

    const handleToggleForm = () => {
        if(signUp === false) {
            setSignUp((prev) => !prev);
            setLogin((prev) => !prev);
            navigate('/signup');
        } else if(signUp === true) {
            setSignUp((prev) => !prev);
            setLogin((prev) => !prev);
            navigate('/login');
        } 

        setFormData((prev) => ({
            signUp: {
                email: '',
                password: '',
                confirm: '',
            },
            login: {
                email: '',
                password: '',
            }
        }));
    
        setFeedback({
            email: false,
            password: false,
            confirm: false,
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        let  value = e.target.value;
        
        if(signUp) {
            if( name === 'email') {
                if(formData.signUp.email === '') {
                    setFeedback((prev) => ({...prev, email: true,}));
                    setMessage((prev) => ({
                        ...prev,
                        email: "Can't be empty"
                    }));
                }   else if(!validator.isEmail(value)) {
                        setFeedback((prev) => ({...prev, email: true}));
                        setMessage((prev) => ({
                            ...prev,
                            email: "Invalid email"
                        }));
                    }
            }   else if(name === 'password') {
                    if(formData.signUp.password === '') {
                        setFeedback((prev) => ({...prev, password: true,}));
                        setMessage((prev) => ({
                            ...prev,
                            password: "Can't be empty"
                        }));
                    } else if (!validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowerCase: 1,
                        minUpperCase: 1,
                        minNumbers: 1,
                        minSymbols: 1
                    })) {
                        setMessage((prev) => ({
                            ...prev,
                            password: 'password is not strong enough',
                        }));
                    } 
                }   else if(name === 'confirm') {
                        if(formData.signUp.confirm === '') {
                            setFeedback((prev) => ({...prev, confirm: true,}));
                            setMessage((prev) => ({
                                ...prev,
                                confirm: "Can't be empty"
                            }));
                        } else if(formData.signUp.confirm !== formData.signUp.password) {
                            setFeedback((prev) => ({...prev, confirm: true,}));
                            setMessage((prev) => ({
                                ...prev,
                                confirm: 'passwords do not match',
                            }))
                        }
                    }


        }   else if (login) {
                if(name === 'email') {
                    if(formData.login.email === '') {
                        setFeedback((prev) => ({...prev, email: true,}));
                        setMessage((prev) => ({
                            ...prev,
                            email: "Can't be empty"
                        }));
                    }   else if(!validator.isEmail(value)) {
                            setFeedback((prev) => ({...prev, email: true,}));
                            setMessage((prev) => ({
                                ...prev,
                                email: "Invalid email"
                            }));
                        }
                }   else if(name === 'password') {
                        if(formData.login.password === '') {
                            setFeedback((prev) => ({...prev, password: true,}));
                            setMessage((prev) => ({
                                ...prev,
                                password: "Can't be empty"
                            }));
                        }
                    }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [signUp ? 'signUp': 'login'] : {
            ...prevData[signUp ? 'signUp': 'login'],
            [name]: value.trim(),
            }
        }));

        if(name === 'email') {
            setMessage((prev) => ({ ...prev, email: '' }));
            setFeedback((prev) => ({ ...prev, email: false })); 
        } else if(name === 'password') {
            setMessage((prev) => ({ ...prev, password: '' }));
            setFeedback((prev) => ({ ...prev, email: false })); 
        } else if(name === 'confirm') {
            setMessage((prev) => ({ ...prev, confirm: '' }));
            setFeedback((prev) => ({ ...prev, email: false })); 
        }
        
    };

    return {
        user,
        auth,
        isLoggedIn,
        login,
        signUp,
        feedback,
        formData,
        message,
        handleBlur,
        handleSubmit,
        handleChange,
        handleToggleForm,
    };
    
}