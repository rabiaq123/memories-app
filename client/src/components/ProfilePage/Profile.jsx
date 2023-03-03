import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsByCreatorId } from '../../actions/posts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';

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
    // console.log(name);
  }, [id]);

  return (
    <div>
      <Typography variant="h2">{user?.name}</Typography>
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