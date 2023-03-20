import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Typography, CircularProgress, Grid, Divider, Button, Box, Modal, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import { getUser, addNewFollowerAction, removeFollowerAction } from '../../actions/user';
import { getPostsByCreatorId } from '../../actions/posts';
import Post from '../Posts/Post/Post';

const Profile = () => {
  const { id } = useParams(); // user's name from URL

  const dispatch = useDispatch();
  const classes = useStyles();
  const { user } = useSelector((state) => state.user); // user whose profile is being viewed
  const { posts, isLoading } = useSelector((state) => state.posts);

  const initialState = JSON.parse(localStorage.getItem('profile'));
  const loggedID = initialState?.result?._id;
  let following = false

  for (let i = 0; i < user?.followers?.length; i++) {
    if (user?.followers[i]._id === loggedID) following = true;
  }
  const [isFollowed, setIsFollowed] = useState(following);

  const [open, setOpen] = React.useState(false);
  const [followersClicked, setFollowersClicked] = useState(false);
  const handleOpen = () => { // allow opening modal if user has followers
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setIsFollowed(following);
  }, [following]);
  
  // console.log('current user is:', user);
  // console.log('isFollowed', isFollowed);
  // console.log('user_posts', posts)

  const handleFollowersClick = () => {
    setFollowersClicked(true);
    handleOpen();
  }

  const handleFollowingClick = () => {
    setFollowersClicked(false);
    handleOpen();
  }

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
  }, [id]);
  

  const FollowButton = () => {
    if (loggedID && loggedID !== id) {
      if (isFollowed) {
        return <Button variant="contained" color="inherit" onClick={() => handleUnfollow(id, loggedID)}>Unfollow</Button>
      } else {
        return <Button variant="contained" color="primary" onClick={() => handleFollow(id, loggedID)}>Follow</Button>
      }
    }
    return null;
  }

  const FollowersList = () => {
    if (user?.followers?.length > 0) {
      return (
        user?.followers?.map((follower) => (
          <li key={follower._id} style={{ listStyle: "none" }}>
            <Link to={`/user/${follower._id}`} onClick={() => setOpen(false)} className={classes.listedAccount}>
              <Avatar style={{backgroundColor: '#3f51b5'}}>{follower.name.charAt(0)}</Avatar>
              {follower.name}
            </Link>
          </li>
        ))
      )
    }
    return (
      <>This account has no followers yet.</>
    )
  }

  const FollowingList = () => {
    if (user?.following?.length > 0) {
      return (
        user?.following?.map((following) => (
          <li key={following._id} style={{ listStyle: "none" }}>
            <Link to={`/user/${following._id}`} onClick={() => setOpen(false)} className={classes.listedAccount}>
              <Avatar style={{backgroundColor: '#3f51b5'}}>{following.name.charAt(0)}</Avatar>
              {following.name}
            </Link>
          </li>
        ))
      )
    }
    return (
      <>This account is not following anyone yet.</>
    )
  }


  return (
    <div>
      <div className={classes.profileInfo}> 
        <Typography variant="h2" className={classes.userName}>{user?.name}</Typography>
        <div className={classes.socialInfo}>
          {(loggedID === id) && <Button component={Link} to='/edit' variant="contained" color="primary">Edit Profile</Button>}
          <FollowButton />
          <p className={classes.userCount} onClick={handleFollowersClick}>{user?.followers?.length} Followers</p>
          <p className={classes.userCount} onClick={handleFollowingClick}>{user?.following?.length} Following</p>
        </div>
      </div>
      <Divider style={{ margin: '20px 0 50px 0' }} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom:10}}>
            {followersClicked ? 'Followers' : 'Following'}
          </Typography>
          <Typography id="modal-modal-description">
            {followersClicked ? <FollowersList /> : <FollowingList />}
          </Typography>
        </Box>
      </Modal>

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