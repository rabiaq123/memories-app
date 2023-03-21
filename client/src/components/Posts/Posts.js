import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import { useEffect } from 'react';
import { Typography} from '@material-ui/core';

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
  const initialState = JSON.parse(localStorage.getItem('profile'));
  const id = initialState?.result?._id;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(id))
  },[])

  if (!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {(typeof user.following[0] === "undefined") && <Typography variant="h3">Following no users.</Typography>}
        {posts?.filter(post => {

          if(searchQuery !== null) {
            return post
          }

          for (let i = 0 ; i < user.following.length ; i++) {
            console.log(user.following[i])
            if (post.creator === user.following[i]._id) {
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
