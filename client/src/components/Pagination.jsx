/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page, isUserFeed = true }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (page) {
      if (isUserFeed) dispatch(getPosts(page)); // TODO: (part of US8, task 64) change this to a dispatch to get posts by users being followed
      else dispatch(getPosts(page));
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
