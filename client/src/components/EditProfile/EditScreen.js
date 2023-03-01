import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container, Avatar, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';

import AccountBoxIcon from '@material-ui/icons/AccountBoxSharp';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Input from '../Auth/Input';

const user = JSON.parse(localStorage.getItem('profile'));
const initialState = { firstName: user?.result?.name, lastName: user?.result?.name, email: user?.result?.email};

const EditScreen = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [form, setForm] = useState(initialState);

  const handleSubmit = () => {

  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align='center'>Edit Profile</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
              <Input name="firstName" label= {user?.result?.name} handleChange={handleChange} autoFocus half />
              <Input name="lastName" label= {user?.result?.name} handleChange={handleChange} autoFocus half />
              <Input name="email" label= {user?.result?.email} handleChange={handleChange}  />
            </>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditScreen;
