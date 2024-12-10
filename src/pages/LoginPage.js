import LoginForm from "../components/LoginForm";
import { Container, Image } from 'react-bootstrap';
import movieIcon from '../assets/logo.svg';

import "../styles/login/login.scss";

const LoginPage = () => {
    return (
        <Container fluid className="login-container">
            <Image 
                src={movieIcon}
                alt="red movie clip"
                className="movie-icon"
            />
            <LoginForm />
        </Container>
        
    )
}

export default LoginPage;