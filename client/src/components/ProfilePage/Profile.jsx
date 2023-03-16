import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, CircularProgress, Grid, Divider, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import { getPostsByCreatorId } from '../../actions/posts';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, addNewFollowerAction, removeFollowerAction } from '../../actions/user';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Profile = () => {
  const { id } = useParams(); // user's name from URL

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // user whose profile is being viewed
  const { posts, isLoading } = useSelector((state) => state.posts);
  const initialState = JSON.parse(localStorage.getItem('profile'));
  const loggedID = initialState?.result?._id;
  const [isFollowed, setIsFollowed] = useState(user?.followers?.includes(loggedID));
  const classes = useStyles();

  // console.log('id', id);
  console.log('viewed user:', user);
  // console.log('user_posts', posts)

  const handleFollow = (id, new_follower_id) => {
    setIsFollowed(true);
    dispatch(addNewFollowerAction(id, new_follower_id));
  }

  const handleUnfollow = (id, remove_user_id) => {
    setIsFollowed(false);
    dispatch(removeFollowerAction (id, remove_user_id));
  }

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getPostsByCreatorId(id));
    // handleFollow('6400c5e8dcc14a33a65f7876', '63e5266426cfdd0014b607b6');
    // handleUnfollow ('6400c5e8dcc14a33a65f7876', '63e5266426cfdd0014b607b6');
  }, [id]);
  
  const FollowButton = () => {
    if (loggedID && loggedID !== id) {
      if (isFollowed) {
        return <Button variant="contained" color="primary" onClick={() => handleUnfollow(id, loggedID)}>Unfollow</Button>
      } else {
        return <Button variant="contained" color="primary" onClick={() => handleFollow(id, loggedID)}>Follow</Button>
      }
    }
    return null;
  }

  return (
    <div>
      <div className={classes.profileInfo}> 
        <Typography variant="h2" className={classes.userName}>{user?.name}</Typography>
        <div className={classes.followingInfo}>
          {(loggedID === id) && <Button component={Link} to='/edit' variant="contained" color="primary">Edit Profile</Button>}
          <FollowButton />
        </div>
        
      </div>
      <Divider style={{ margin: '20px 0 50px 0' }} />

      {posts?.length == 0 && !isLoading && <p>No posts</p>}

      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} key={post._id}/>
          </Grid>
          ))}
        </Grid>
      )}

    </div>
  )
}

export default Profile