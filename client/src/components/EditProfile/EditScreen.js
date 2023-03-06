import React, { useState } from 'react';
import { Button, Typography, Paper, Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUserProfile } from '../../actions/user';
import { Redirect, useHistory } from 'react-router-dom';
import useStyles from './styles';
import Input from '../Auth/Input';

const EditScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialState = JSON.parse(localStorage.getItem('profile'));
  const id = initialState?.result?._id;
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  if (!initialState) { // if user is not logged in, redirect to login page
    history.push('/auth');
  }

  // This is a helper function that can be used for updating a users profile
  const update_user = (id, email, name) => {
    dispatch(updateUserProfile (id, email, name));
    console.log ('updated_user', user);
    
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(getUser(id));
    update_user(id, email, name)
    
 
    // setName('');
    // setEmail('');
    history.push(`/user/${id}`)
    
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      default:
        break;
    }
  };

  return (

      <Container component="main" maxWidth="xs">
        {initialState && (
          <Paper className={classes.paper} elevation={6}>
            <Typography component="h1" variant="h5" align='center' style={{marginBottom: '16px'}}>
              Edit Profile
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <>
                  {/* TODO: split name into first and last name (by space) */}
                  <Input name="name" label="Name" handleChange={handleChange} autoFocus value={name}/>
                  <Input name="email" label="Email" handleChange={handleChange} value={email} />
                </>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                Update & Return
              </Button>
              <Button onClick={() => history.goBack()} fullWidth variant="contained" color="primary"> Back to Profile </Button>
            </form>
          </Paper>
        )} 
      </Container>
  );
};

export default EditScreen;
