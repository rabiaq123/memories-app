// import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getUsers } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import useStyles from './styles';
import Account from './Account/Account'

const Accounts = () => {
  const { users, isLoading } = useSelector((state) => state.user); // state.user because user is the name of the reducer
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log("users", users);
  if (users?.length == 0 && !isLoading) return 'No users'; // TODO: UNCOMMENT THIS

  return (
    isLoading ? <CircularProgress /> : (
      <>
        <div>
          <u>Accounts</u>
          &nbsp;
          &nbsp;
          <Link to="/" style={{ textDecoration: 'none' }}>Posts</Link>
        </div>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {users?.map((user) => (
            <Grid key={user._id} item xs={12} sm={12} md={6} lg={3}>
              <Account user={user}/>
            </Grid>
          ))}
        </Grid>
      </>
    )
  );
};

export default Accounts;
