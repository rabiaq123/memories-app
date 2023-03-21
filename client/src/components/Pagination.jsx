/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { getFollowingPostsAction, getPosts } from '../actions/posts';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Paginate = ({ page, isUserFeed = true }) => {
  const query = useQuery()
  const pageTest = query.get('page') || 1;
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  const id = currentUser?.result?._id;

  const classes = useStyles();

  useEffect(() => {
    if (pageTest) {
      if (!isUserFeed) { // discover page
        dispatch(getPosts(pageTest));
      } else if (id != null) {
        console.log("id is " + id)
        dispatch(getFollowingPostsAction(id, pageTest));
      }
    }
  }, [dispatch, pageTest]);

  const link = (item) => isUserFeed ? `/posts?page=${item.pageTest}` : `/posts/discover?page=${item.pageTest}`;

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
