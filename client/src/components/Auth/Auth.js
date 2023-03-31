import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { userName: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {

  const [form, setForm] = useState(initialState);
  const [isSpace, setSpace] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(auth.signupErrors == null ? false : true);
  const [showError, setShowError] = useState(auth.signinErrors == null ? false : true);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [usernameError, setUsernameError] = useState(auth.signupErrors == null ? false : auth.signupErrors.includes("name"));
  const [emailError, setEmailError] = useState(auth.signupErrors == null ? false : !auth.signupErrors.includes("name"));

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setUsernameError(false);
    setEmailError(false);
    setShowError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpace(false);
    if ((form.userName).indexOf(' ') >= 0) {
      setSpace(true);
    } else if (isSignup) {
      console.log("FORM INFO:", form)
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
            {/* Add username input field */}
              <Input name="userName" label="Username" handleChange={handleChange} autoFocus/>
              {isSpace && <div className={classes.error}>Usernames cannot contain spaces within it.</div>}
              {usernameError && <div className={classes.error}>This usernames is already taken. Please select another username.</div>}
              <Input name="firstName" label="First Name" handleChange={handleChange} half/>
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
          
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            {(emailError && isSignup) && <div className={classes.error}>This email is already taken. Please enter another email.</div>}
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            {showError && <span style={{fontSize:'15px', paddingLeft: '8px', color: 'red'}}>Invalid username or password.</span>}
          
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
