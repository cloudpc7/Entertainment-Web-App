import { useContext } from 'react';
import  AuthContext from '../AuthContext';
import { Form, Button } from 'react-bootstrap';
import '../styles/login/login.scss';

const LoginForm = () => {

  const {
    login,
    signUp,
    feedback,
    formData,
    message,
    handleBlur,
    handleSubmit,
    handleChange,
    handleToggleForm,
} = useContext(AuthContext);

const { email, password, confirm } = formData.signUp;

  return (
   <div className="form-container">
    {
      signUp ? (
        <h1 className="login-title h1">Sign Up</h1>
      ) : login && (
        <h1 className="login-title h1">Login</h1>
      )
    }
    <Form className="form"  onSubmit={ handleSubmit } noValidate>
      {
        signUp ? (
          <>
            <Form.Group controlId="signUpEmail">
              <Form.Control 
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={feedback.email}
              />
              <Form.Control.Feedback type="invalid" className="feedback" >
                {feedback.email ? message.email : '' }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control 
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={ feedback.password }
              />
              <Form.Control.Feedback type="invalid" className="feedback">
                { !feedback.password ?  message.password : ''}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Control 
                type="password"
                placeholder="Confirm password"
                name="confirm"
                value={confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={ feedback.confirm }
              />
              <Form.Control.Feedback type="invalid" className="feedback">
                { feedback.confirm ?  message.confirm : ''}
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              className="login-button" 
              type="submit" 
            >
              Create an account
            </Button>
            <p className="form-switch">
              Already have an account? 
              <span onClick={handleToggleForm}>Login</span>
            </p>
            {
              message.signup ? (
                <>
                <p className="error-message">{message.signup}</p>
                </>
              ) : message.account ? (
                <>
                <p className="error-message">{message.account}</p>
                </>
              ) : ''
            }
          </> 
        ) : login && (
          <>
          <Form.Group controlId="emailAddress">
              <Form.Control 
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.login.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={ feedback.email }
              />
              <Form.Control.Feedback type="invalid" className="feedback">
                {feedback.email && message.email }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Control 
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.login.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={ feedback.password  }
              />
              <Form.Control.Feedback type="invalid" className="feedback">
                {feedback.password && message.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              className="login-button" 
              type="submit" 
            >
              Login to your account
            </Button>
            <p className="form-switch">
              Don't have an account? 
              <span onClick={handleToggleForm}>Sign Up</span>
            </p>
            {
              message.login && <p className="error-message">{message.login}</p>
            }
          </>
        )
      }
    </Form>
   </div>
  )
};

export default LoginForm;