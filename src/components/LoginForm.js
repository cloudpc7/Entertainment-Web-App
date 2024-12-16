import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import * as bcrypt from 'bcryptjs';
import '../styles/login/login.scss';

const LoginForm = ({ 
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
  
  const [cookies, setCookies] = useCookies(['token']);
  const { email, password } = formData;
  const { errMsgEmail , errMsgPassword, errMsgConfirmPassword } = errMsg;
  const { signUpEmail, signUpPassword, signUpConfirmPassword} = signUp;

  return (
    <div className="form-container">
      {signUp ? (
        <h1 className="login-title h1">Sign Up</h1>
      ) : login && (
        <h1 className="login-title h1">Login</h1>
      )}

      <Form className="form" onSubmit={handleSubmit} noValidate>
        {signUp ? (
          <>
            <Form.Group>
              <Form.Control 
                type="email" 
                placeholder="Email address"
                name="email"
                value={signUpEmail}
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              { email && errMsgEmail && (
                <span type="invalid" className="error-message">
                  {errMsgEmail}
                </span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control 
                type="password" 
                placeholder="Password"
                value={signUpPassword}
                name="password"
                autocomplete="current-password"
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {signUpPassword && errMsgPassword && (
                <span type="invalid" className="password-message">
                  {errMsgPassword}
                </span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control 
                type="password" 
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signUpConfirmPassword}
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {signUpConfirmPassword && errMsgConfirmPassword && (
                <span type="invalid" className="confirm-message">
                  {errMsgConfirmPassword}
                </span>
              )}
            </Form.Group>
            <Button 
              className="login-button" 
              type="submit" 
              disabled={errMsg.email || errMsg.password || errMsg.confirmPassword}
            >
              Create an account
            </Button>
            <p className="form-switch">
              Already have an account? 
              <span onClick={handleToggleForm}>Login</span>
            </p>
          </>
        ) : login && (
          <>
            <Form.Group>
              <Form.Control 
                type="email" 
                placeholder="Email address"
                name="email"
                value={email}
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {email && errMsgEmail && (
                <span className="error-message" type="invalid">
                  {errMsgEmail}
                </span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control 
                type="password" 
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {password && errMsgPassword && (
                <span type="invalid" className="password-message">
                  {errMsgPassword}
                </span>
              )}
            </Form.Group>
            <Button 
              className="login-button" 
              type="submit" 
              disabled={errMsgEmail || errMsgPassword} 
            >
              Login to your account
            </Button>
            <p className="form-switch">
              Dont have an account? 
              <span onClick={handleToggleForm}>Sign Up</span>
            </p>
          </>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;