// import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getUsers } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import Post from './Post/Post';
import useStyles from './styles';

const Accounts = () => {
  const { user, isLoading } = useSelector((state) => state.user); // state.posts because posts is the name of the reducer
  const classes = useStyles();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUsers());
  }, [user]);

  console.log("users",user);
  if (!user.length && !isLoading) return 'No users';

  return (
    isLoading ? <CircularProgress /> : (
        <><Link to="/accounts">Accounts</Link>
        <Link to="/posts">Posts</Link></>
    //   <Grid className={classes.container} container alignItems="stretch" spacing={3}>
    //     {posts?.map((post) => (
    //       <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
    //         <Post post={post} setCurrentId={setCurrentId} />
    //       </Grid>
    //     ))}
    //   </Grid>
    )
  );
};

export default Accounts;
