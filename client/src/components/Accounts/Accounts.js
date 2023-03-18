import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getUsers } from '../../actions/user';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, CircularProgress} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Form from '../Form/Form';

import useStyles from './styles';
import Account from './Account/Account'

const Accounts = () => {
  const { users, isLoading } = useSelector((state) => state.user); // state.user because user is the name of the reducer
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [currentId, setCurrentId] = useState(0);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log("users", users);
  if (users?.length == 0 && !isLoading) return 'No users';

  const searchAccount = () => {
    if (search == '') {
      history.push('/accounts');
    } else if (search.trim()) {
      // some if statement is there is nothing found try closestSearch
      console.log(closestSearch(search));
    } else {
      history.push('/accounts');
    }
  };

  const closestSearch = (search) => {
    let greatestMatch = 0;
    let greatestMatchName = "";

    for(let i = 0 ; i < users.length ; i++) {
      let matchScore = 0;

      //score up how many letters are the same
      if (search.length >= (users[i].name).length) {
        for(let x = 0 ; x < (users[i].name).length ; x ++) {
          if (users[i].name[x] == search[x]) {
            matchScore++;
          }
        }
      } else {
        for(let x = 0 ; x < search.length ; x ++) {
          if (users[i].name[x] == search[x]) {
            matchScore++;
          }
        }
      }

      //changes match if there is a greater score
      if (matchScore > greatestMatch) {
        greatestMatch = matchScore;
        greatestMatchName = users[i].name;
      }
    }

    return greatestMatchName;
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchAccount();
    } else {
      setSearch(e.target.value);
    }
  };

  const clickedSearch = (search) => {
    setSearch(search);
  }

  return (
    isLoading ? <CircularProgress /> : (
      <>
        <Grow in>
          <Container maxWidth="xl">
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6} md={9}>
                <div>
                  <u>Accounts</u>
                  &nbsp;
                  &nbsp;
                  <Link to="/" style={{ textDecoration: 'none' }}>Posts</Link>
                </div>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                  {users?.map((user) => (
                    <Grid key={user._id} item xs={12} sm={12} md={6} lg={3}>
                      <Account user={user}/>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                  <div className={classes.list}>
                    {/* suggests users for search bar based on letters typed */}
                    {users?.filter(user => {
                      const searchTerm = search.toLowerCase();
                      const userName = user.name.toLowerCase();
                      return (searchTerm && userName.startsWith(searchTerm) && searchTerm !== userName);
                    }).map((user) => (
                      // displays all the users that were suggested
                      <div className={classes.listItems} onClick={() => clickedSearch(user.name)}>
                        {user.name}
                      </div>
                    ))}
                  </div>
                  <Button onClick={searchAccount} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </>
    )
  );
};

export default Accounts;
