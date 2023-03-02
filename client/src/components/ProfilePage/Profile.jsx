import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import { getPostsByCreator } from '../../actions/posts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, getUsers } from '../../actions/user';
import { getPosts, getPost } from '../../actions/posts';

const Profile = () => {
  const { name } = useParams(); // user's name from URL
  // const { posts, isLoading } = useSelector((state) => state.posts);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  console.log('user', user);
  console.log('user_posts', posts)
  // console.log("the user is:" + user);


  useEffect(() => {
    dispatch(getUser(name)); // THIS IS THE PROBLEM LINE
    dispatch(getPostsByCreator(name));
    console.log(name);
  }, [name]);

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />

      {/* <Typography variant="h4">{user?.email}</Typography> */}

      {/* {isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} key={post._id}/>
        </Grid>
        ))}
      </Grid>
      )}
      {!posts && <Typography variant="h2">No posts</Typography>} */}
    </div>
  )
}

export default Profile