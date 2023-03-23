import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function prevSearch(searchQuery, dispatch, history) {
  if (searchQuery?.substr(0, searchQuery.length - 1) === localStorage.getItem("search")) {
    let search = localStorage.getItem("search");
    dispatch(getPostsBySearch({ search, tags: search }));
    history.push(`/posts/search?searchQuery=${search || 'none'}`);
    localStorage.setItem("search", " ");
  }
}

const Discover = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const location = useLocation();

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [isUserSearch, setIsUserSearch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    prevSearch(searchQuery, dispatch, history);
  }, []);

  const searchPost = () => {
    if (search == '') {
      history.push(`/`);
    } else if (isUserSearch) {
      localStorage.setItem("search", search)
      dispatch(getPostsByCreator(search));
      history.push(`/posts/search?searchQuery=${search || 'none'}`);
    } else if (search.trim()) {
      dispatch(getPostsBySearch({ search, tags: search }));
      console.log('the search query is', search);
      localStorage.setItem("search", search)
      console.log("Search Item:", localStorage.getItem("search"))
      history.push(`/posts/search?searchQuery=${search || 'none'}`);
    } else {
      history.push(`/`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleChange = (event) => {
    setIsUserSearch(event.target.checked);
  };

  return (
    <>
    <Grow in>
      <Container maxWidth="xl">
        {location.pathname.startsWith('/posts/discover') && (
          <Typography variant="h4" align="left" style={{paddingBottom:'10px'}}>Discover</Typography>
        )}
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} isUserFeed={false}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              <FormGroup>
                <FormControlLabel control={<Checkbox
                  checked={isUserSearch}
                  onChange={handleChange} />} label="Search by User" />
              </FormGroup>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} isUserFeed={false} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </>
  );
};

export default Discover;
