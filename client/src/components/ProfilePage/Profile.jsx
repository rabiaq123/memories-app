import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, CircularProgress, Grid, Divider, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import { getPostsByCreatorId } from '../../actions/posts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, updateUserProfile } from '../../actions/user';
import { Link } from 'react-router-dom';




const Profile = () => {
  const { id } = useParams(); // user's name from URL

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts, isLoading } = useSelector((state) => state.posts);

  console.log('id', id);
  console.log('user', user);
  console.log('user_posts', posts)

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getPostsByCreatorId(id));
    // update_user("6400c5e8dcc14a33a65f7876", "test46@gmail.com", "New Wes March 2 10:24pm")
    // console.log(name);
  }, [id]);


  // This is a helper function that can be used for updating a users profile
  const update_user = (id, email, name) => {
    dispatch (updateUserProfile (id, email, name));
    console.log ('updated_user', user);
  }

  return (
    <div>
      <Typography variant="h2">{user?.name}</Typography>
      <Button component={Link} to='/edit' variant="contained" color="primary">Edit Profile</Button>
      <Divider style={{ margin: '20px 0 50px 0' }} />

      {isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} key={post._id}/>
        </Grid>
        ))}
      </Grid>
      )}
      {!posts && <Typography variant="h2">No posts</Typography>}

    </div>
  )
}

export default Profile