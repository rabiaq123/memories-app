import React from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Post from './Post/Post';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Posts = ({ setCurrentId }) => {
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const { posts, isLoading } = useSelector((state) => state.posts); // state.posts because posts is the name of the reducer
  const classes = useStyles();

  console.log(searchQuery);
  return (
    isLoading ? <CircularProgress /> : (
      <>
      {(searchQuery !== null) && (<div>
        <Link to="/accounts" style={{ textDecoration: 'none' }}>Search Accounts</Link>
        &nbsp;
        &nbsp;
        <u>Posts</u>
      </div>)}
      {(posts?.length === 0) && <Typography variant="h3">No posts found.</Typography>}
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
