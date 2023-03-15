import React from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
// import Accounts from './Accounts/Accounts';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts); // state.posts because posts is the name of the reducer
  const classes = useStyles();

  if (posts?.length == 0 && !isLoading) return 'No posts';

  return (
    isLoading ? <CircularProgress /> : (
      <>
      <div>
        <Link to="/accounts" style={{ textDecoration: 'none' }}>Accounts</Link>
        &nbsp;
        &nbsp;
        <u>Posts</u>
      </div>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid></>
    )
  );
};

export default Posts;
