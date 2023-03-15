// import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getUsers } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import useStyles from './styles';

const Accounts = () => {
  const { users, isLoading } = useSelector((state) => state.user); // state.user because user is the name of the reducer
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log("users", users);
  // if (!users.length && !isLoading) return 'No users'; // TODO: UNCOMMENT THIS

  return (
    isLoading ? <CircularProgress /> : (
      <>
        <Link to="/accounts">Accounts</Link>
        <Link to="/">Posts</Link>
        {users?.map((user) => (
          <div key={user._id}>
            <h3>User: {user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </>
    )
  );
};

export default Accounts;
