import React, { useState } from 'react';
import { Button, Typography, Paper, Container, Grid, Modal, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUserProfile } from '../../actions/user';
import { useHistory } from 'react-router-dom';
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
  const [disableUpdate, setDisableUpdate] = useState(true); // disable update button by default
  const [open, setOpen] = useState(false); // for delete confirmation modal

  if (!initialState) { // if user is not logged in, redirect to login page
    history.push('/auth');
  }

  // helper function that can be used for updating a users profile
  const update_user = (id, email, name) => {
    dispatch(updateUserProfile (id, email, name));
    // console.log ('updated_user', user);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(id));
    update_user(id, email, name)
    setDisableUpdate(true);
  }

  const handleChange = (e) => {
    if (name != e.target.name || email != e.target.email) { // enable update button if user changes name or email
      setDisableUpdate(false);
    }
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

  const handleDelete = () => {
    console.log('delete user');
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
            <p style={{color: 'GrayText', fontSize: '15px'}}>Are you sure you want to delete your account? You will be logged out upon confirmation.</p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant='outlined' onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant='contained' color='secondary' onClick={handleDelete}>Delete</Button>
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
                  <Input name="name" label="Name" handleChange={handleChange} autoFocus value={name}/>
                  <Input name="email" label="Email" handleChange={handleChange} value={email} />
                </>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!name || !email || disableUpdate}>
                Update
              </Button>
              <Button fullWidth variant="contained" color="secondary" onClick={() => history.goBack()}> Back to Profile </Button>

              <hr style={{width: '100%', margin: '30px 30px' }} />

              <Typography variant="h5" align='center'>
                Delete Profile
              </Typography>
              <br />
              <p style={{color: 'GrayText', fontSize: '15px'}}> Deleting your account will also remove all likes, posts, and comments. </p>
              <Button fullWidth variant="contained" color="secondary" onClick={() => setOpen(true)}> Delete </Button>
              <DeleteAccountModal />

            </form>
          </Paper>
        )} 
      </Container>
  );
};

export default EditScreen;
