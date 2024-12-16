import LoginForm from "../components/LoginForm";
import { Container, Image } from 'react-bootstrap';
import movieIcon from '../assets/logo.svg';

import "../styles/login/login.scss";

const LoginPage = ({ 
    isLoggedIn, 
    touched, 
    login, 
    signUp, 
    errMsg, 
    formData, 
    handleSubmit,
    handleChange,
    handleBlur,
    handleToggleForm
    }) => {
    
    return (
        <Container fluid className="login-container">
            <Image 
                src={movieIcon}
                alt="red movie clip"
                className="movie-icon"
            />
            <LoginForm 
                IsLoggedIn={isLoggedIn}
                touched={touched}
                login={login}
                signUp={signUp}
                errMsg
                formData={formData}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleToggleForm={handleToggleForm}

                />
        </Container>
        
    )
}

export default LoginPage;