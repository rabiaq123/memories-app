import React, { useState } from 'react';
import { Button, Typography, Paper, Container, Grid, Modal, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {DeleteOutline, Edit} from '@material-ui/icons';

import useStyles from './styles';
import { deleteUserAction, getUser, updateUserProfile } from '../../actions/user';
import Input from '../Auth/Input';
import * as actionType from '../../constants/actionTypes';

const EditScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialState = JSON.parse(localStorage.getItem('profile'));
  const id = initialState?.result?._id;
  const history = useHistory();
  const { user, error } = useSelector((state) => state.user);
  const [usernameError, setUsernameError] = useState(error == null ? false : error.includes("name"));
  const [emailError, setEmailError] = useState(error == null ? false : !error.includes("name"));
  // TODO: REMOVE CONSOLE LOG ONCE ISSUE IS FIXED
  console.log("error", error);
  console.log("username error", usernameError);
  console.log("username error", emailError);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [displayname, setDisplayName] = useState(user?.displayname);
  const [username, setUsername] = useState(user?.username);

  const [isSpace, setSpace] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(true); // disable update button by default
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [open, setOpen] = useState(false); // for delete confirmation modal

  if (!initialState) { // if user is not logged in, redirect to login page
    history.push('/auth');
  }

  // helper function that can be used for updating a users profile
  const update_user = (id, email, name, displayname, username) => {
    setUsernameError(false);
    setEmailError(false);
    dispatch(updateUserProfile(id, email, name, displayname, username));
    // console.log ('updated_user', user);
  }

  // useEffect(() => {
  //   dispatch(updateUserProfile (id, email, name, displayname, username));
  // }, [usernameError, emailError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(id)); // user info from database, accessible through redux store (user object)
    dispatch(updateUserProfile(id, email, name, displayname, username));
    // if(name == user?.name) {
    //   if (email == oldEmail) {
    //     update_user(id, email, name, displayname, true, true);
    //   } else {
    //     update_user(id, email, name, displayname, true, false);
    //   }
    // } else {
    //   if (email == oldEmail) {
    //     update_user(id, email, name, displayname, false, true);
    //   } else {
    //     update_user(id, email, name, displayname, false, false);
    //   }
    // }

    setDisableUpdate(true);
  }

  const handleChange = (e) => {
    setDisableUpdate(false); // default

    // disable update button if the name and email are the same as the current saved name and email
    if (e.target.name == 'name' && e.target.value == user?.name) { 
      if (email == user?.email && displayname == user?.displayname && username == user?.displayname) { 
        setDisableUpdate(true);
      }
    } else if (e.target.name == 'email' && e.target.value == user?.email) {
      if (name == user?.name && displayname == user?.displayname) { 
        setDisableUpdate(true);
      }
    } else if (e.target.name == 'displayName' && e.target.value == user?.displayname) { 
      if (name == user?.name && email == user?.email) { 
        setDisableUpdate(true);
      }
    } else if (e.target.name == 'displayName' && e.target.value == user?.displayname) { 
      if (name == user?.name && email == user?.email) { 
        setDisableUpdate(true);
      }
    }
    
    // if the name, email or displayname is changed, update the state
    if (e.target.name == 'name') {
      setName(e.target.value);
      if ((e.target.value).indexOf(' ') >= 0) {
        setSpace(true);
        setDisableUpdate(true);
      } else {
        setSpace(false);
      }
    } else if (e.target.name == 'email') {
      setEmail(e.target.value);
    } else if (e.target.name == 'displayName') {
      setDisplayName(e.target.value);
    }
  }

  // https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
  const delay = ms => new Promise(res => setTimeout(res, ms)); // helper function to delay for a certain amount of time

  const logout = () => {
    delay(3000).then(() => { // delay for 3 seconds
      setOpen(false);
      dispatch({ type: actionType.LOGOUT });
      history.push('/auth');
    });
  };

  const handleDelete = () => {
    console.log('delete user');
    setDeleteClicked(true);
    logout();
    dispatch(deleteUserAction(id));
  }

  const DeleteAccountModal = () => {
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom:10}}>
            Delete Account
          </Typography>
          <Typography id="modal-modal-description">
            <p style={{color: 'GrayText', fontSize: '15px'}}>
              {deleteClicked ? 'Deleting...' : 'Are you sure you want to delete your account? You will be logged out upon confirmation.'}
            </p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant='outlined' onClick={() => setOpen(false)} disabled={deleteClicked}>Cancel</Button>
              <Button variant='contained' color='secondary' onClick={handleDelete} disabled={deleteClicked}>
                <DeleteOutline style={{marginRight: 5}} />  
                Delete
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    )
  }

  return (
      <Container component="main" maxWidth="xs">
        {initialState && (
          <Paper className={classes.paper} elevation={6}>
            <Typography variant="h5" align='center' style={{marginBottom: '16px'}}>
              Edit Profile
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <>
                  {/* TODO: split name into first and last name (by space) */}
                  <Input name="name" label="Username" handleChange={handleChange} autoFocus value={name}/>
                  {isSpace && <div className={classes.error}>Username cannot contain spaces within it.</div>}
                  {usernameError && <div className={classes.error}>This username is already taken. Please select another username.</div>}
                  <Input name="displayName" label="Full Name" handleChange={handleChange} autoFocus value={displayname}/>
                  <Input name="email" label="Email" handleChange={handleChange} value={email} />
                  {(emailError) && <div className={classes.error}>This email is already taken. Please enter another email.</div>}
                </>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!name || !email || !displayname || disableUpdate}>
                <Edit style={{marginRight: 5}} />
                Update
              </Button>
              <Button fullWidth variant="contained" color="secondary" onClick={() => history.goBack()}> Back to Profile </Button>

              <hr style={{width: '100%', margin: '30px 30px' }} />

              <Typography variant="h5" align='center'>
                Delete Profile
              </Typography>
              <br />
              <p style={{color: 'GrayText', fontSize: '15px'}}> Deleting your account will also remove all likes, posts, and comments. </p>
              <Button fullWidth variant="contained" color="secondary" onClick={() => setOpen(true)}> 
                <DeleteOutline style={{marginRight: 5}} />  
                Delete
              </Button>
              <DeleteAccountModal />

            </form>
          </Paper>
        )} 
      </Container>
  );
};

export default EditScreen;
