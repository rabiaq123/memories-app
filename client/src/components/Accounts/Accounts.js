import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper, CircularProgress} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { getUsers } from '../../actions/user';
import { getUserByName } from '../../actions/secondaryuser';
import Account from './Account/Account';
import Form from '../Form/Form';
import useStyles from './styles';

function getDisplayUsers (searchUser, users, secondaryuser) {
  console.log(searchUser, secondaryuser)
  if (!searchUser) {
    // console.log("LOCAL STORAGE SEARCH", localStorage.getItem("search"))
    return orderedSearch(localStorage.getItem("search"), users);
  } else {
    // console.log("ORDERED SEARCH", orderedSearch(searchUser, users))
    return orderedSearch(searchUser, users)
  }
}

function orderedSearch (search, users) {
  if (!search) {
    search = "";
  }
  let newArray = []
  var stringSimilarity = require("string-similarity");

  for(let i = 0; i < users?.length; i++) {
    let similarity = stringSimilarity.compareTwoStrings(search, users[i].name);
    // Return a single user if exact match
    if (similarity === 1){
      let singleUser = [users[i]]
      return singleUser
    }
    // console.log("Similarity score: ", similarity, search, users[i].name)
    let user = {
      "name": users[i].name,
      "score": similarity
    }
    newArray.push(user)
  }

  // Sort array by score
  newArray.sort(function(a,b) {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
  });

  // console.log("Sorted: ", newArray)

  let newUsersArray = []
  for(let i = 0; i < 5; i++){
    // console.log(newArray[i].name, users[i].name)
    for(let j = 0; j < users?.length; j++){
      if(newArray[i].name == users[j].name){
        if(newArray[i].score != 0){
          newUsersArray.push(users[j])
          break;
        }
      }
    }
  }

  return newUsersArray
}


const Accounts = () => {
  const { searchUser } = useParams();
  const { users, isLoading } = useSelector((state) => state.user); // state.user because user is the name of the reducer
  const { secondaryuser } = useSelector((state) => state.secondaryuser);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [currentId, setCurrentId] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const sendSearch = localStorage.getItem("search") + " ";
  var displayUsers = getDisplayUsers(searchUser, users, secondaryuser);

  // console.log("DISPLAY USERS: ", displayUsers)
  // console.log("SEARCH ITEM: ", localStorage.getItem("search"))

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserByName(sendSearch));
  }, [sendSearch]);

  // console.log("users", users);
  // console.log("displayUser: " + displayUsers);
  if (users?.length == 0 && !isLoading) return 'No users';

  const searchAccount = () => {
    if (search.trim()) {
      localStorage.setItem("search", search)
      history.push(`/accounts/${search}`);
    }
  };

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
            {location.pathname.startsWith('/posts/discover') && (
              <Typography variant="h4" align="left" style={{paddingBottom:'10px'}}>Discover</Typography>
            )}
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6} md={9}>
                <div style={{display:'flex', gap:'20px', paddingBottom:'10px'}}>
                  <Link to="/posts/discover" style={{ textDecoration: 'none' }}><ArrowBack /></Link>
                  <u>Accounts</u>
                  <Link to={`/posts/search?searchQuery=${sendSearch}`} style={{ textDecoration: 'none' }}>Search Posts</Link>
                </div>
                <br/>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                  {(displayUsers?.length === 0) && <Typography variant="h5">No user found.</Typography>}
                  {displayUsers?.map((user) => (
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
                  <Button onClick={searchAccount} variant="contained" color="primary">Search</Button>
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
