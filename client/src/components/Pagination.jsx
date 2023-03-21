/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getFollowingPostsAction, getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page, isUserFeed = true }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  const id = currentUser?.result?._id;

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      // this doesn't need to be changed based on whether the user is on their feed or the Discover page
      // this is because if isUserFeed == true, the Posts component filters out posts from users not being followed
      // i.e. all posts can be fetched and then filtered based on the isUserFeed prop
      if (!isUserFeed) dispatch(getPosts(page)); 
      else dispatch(getFollowingPostsAction(id, page));
    }
  }, [dispatch, page]);

  const link = (item) => isUserFeed ? `/posts?page=${item.page}` : `/posts/discover?page=${item.page}`;

  return (
    <Pagination
      isUserFeed={false}
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={link(item)} />
      )}
    />
  );
};

export default Paginate;
