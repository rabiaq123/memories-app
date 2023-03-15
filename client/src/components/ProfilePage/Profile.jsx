import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, CircularProgress, Grid, Divider, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import { getPostsByCreatorId, getFollowingPostsAction } from '../../actions/posts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, addNewFollowerAction, removeFollowerAction } from '../../actions/user';
import { Link } from 'react-router-dom';


const Profile = () => {
  const { id } = useParams(); // user's name from URL

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const initialState = JSON.parse(localStorage.getItem('profile'));
  const loggedID = initialState?.result?._id;

  // console.log('id', id);
  console.log('user', user);
  // console.log('user_posts', posts)

  const add_new_user = (id, new_follower_id) => {
    dispatch(addNewFollowerAction(id, new_follower_id));
    
  }

  const remove_user_following = (id, remove_user_id) => {
    dispatch(removeFollowerAction (id, remove_user_id));
  }

  const get_posts_from_following = (id) => {
    dispatch(getFollowingPostsAction (id));
  }

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getPostsByCreatorId(id));
    // add_new_user('6400c5e8dcc14a33a65f7876', '63e5266426cfdd0014b607b6');
    // remove_user_following ('6400c5e8dcc14a33a65f7876', '63e5266426cfdd0014b607b6');
    // get_posts_from_following(id);
  }, [id]);

  return (
    <div>
      <Typography variant="h2">{user?.name}</Typography>
      {(loggedID === id) && (
        <Button component={Link} to='/edit' variant="contained" color="primary">Edit Profile</Button>
      )}
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