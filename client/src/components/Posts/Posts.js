import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { searched } = useParams();
  const { posts, isLoading } = useSelector((state) => state.posts); // state.posts because posts is the name of the reducer
  const classes = useStyles();

  useEffect(() => {
  }, [searched]);

  if (!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.filter(post => {

          const initialState = JSON.parse(localStorage.getItem('profile'));
          const following = initialState?.result?.following;

          console.log(searched);
          if(typeof searched !== 'undefined') {
            console.log("hi");
            return post
          }

          console.log(following)
          for (let i = 0 ; i < following.length ; i++) {
            if (post.creator === following[i]) {
              console.log("there")
              return post
            }
          }
        }).map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
