import React from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import { useEffect } from 'react';
import { ArrowBack } from '@material-ui/icons';

import Post from './Post/Post';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Posts = ({ setCurrentId, isUserFeed = true }) => {
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const { posts, isLoading } = useSelector((state) => state.posts); // state.posts because posts is the name of the reducer
  const classes = useStyles();
  const initialState = JSON.parse(localStorage.getItem('profile'));
  const id = initialState?.result?._id;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof id !== "undefined") dispatch(getUser(id))
  },[])

  const followingPosts = posts?.filter(post => {
              if(searchQuery !== null) {
                return post
              }
              if (typeof user.following !== "undefined") {
                for (let i = 0 ; i < user?.following.length ; i++) {
                  // console.log(user.following[i])
                  if (post.creator === user.following[i]._id) {
                    return post
                  }
                }
              }
            })

  return (
    isLoading ? <CircularProgress /> : (
      <>
        {(searchQuery !== null) && (
          <div style={{display:'flex', gap:'20px', paddingBottom:'10px'}}>
            <Link to="/posts/discover" style={{ textDecoration: 'none' }}><ArrowBack /></Link>
            <Link to="/accounts" style={{ textDecoration: 'none' }}>Search Accounts</Link>
            <u>Posts</u>
          </div>
        )}
        {(posts?.length === 0 && !isUserFeed) && <Typography variant="h3">No posts found.</Typography>}
        {(followingPosts?.length === 0 && isUserFeed && searchQuery == null) && <Typography variant="h5">Follow some users to fill up your feed.</Typography>}

        {isUserFeed ? (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {followingPosts.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        ) : (
          // returns posts by all users if not on user feed / homepage
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>  
        )}
      </>
    )
  );
};

export default Posts;
