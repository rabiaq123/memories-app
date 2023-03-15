import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import { getUsers } from '../../api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Accounts = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [isUserSearch, setIsUserSearch] = useState(false);
  const history = useHistory();

  const searchPost = () => {
   
    if (search == '') {
      history.push('/');
    } else {
    //   dispatch(getUsers());
        // var allUsers = []
        // const promise = Promise.resolve(getUsers());

        // promise
        // .then((value) => {
        //     for (let i = 0; i < value.data.length; i ++){
        //         console.log("User: ", i, value.data)
        //         // allUsers.push(value.data[i])
        //     }
        //     allUsers = value.data
        //     // console.log("All Users", value.data.length); //This is a fulfilled promise  👈
        // })
        // .catch((err) => {
        //     console.log(err); 
        // });
        
      // dispatch(getUsersBySearch(search));
    } 
    
  };

  let allUsers = new Array()
  const promise = Promise.resolve(getUsers());

    promise
    .then((value) => {
        for (let i = 0; i < value.data.length; i ++){
            // console.log("User: ", i, value.data.toString())
            // console.log("User", JSON.parse(value.data[i]))
            //allUsers.push(value.data[i])
            // var user = {}
            // user["email"] = value.data[i].email 
            // user["name"] = value.data[i].name
            // user["id"] = value.data[i]["_id"]

            // console.log("user", user)
            allUsers.push(value.data[i])
        }
        
        // allUsers.push.apply(allUsers, value.data)
    })
    .catch((err) => {
        console.log(err); 
    });

    const getNames = () =>{
      let names = []
      setTimeout(function(){
        for (let i = 0; i < allUsers.length; i++){
          console.log(allUsers[i].name)
          names.push(allUsers[i].name)
        }
        console.log(allUsers);
  
      }, 1000);

      return names
    }
    
    // console.log(names)
    const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleChange = (event) => {
    setIsUserSearch(event.target.checked);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          {/* <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid> */}
          <h1>All Users</h1>
          <h2>{getNames()}</h2>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              
            </AppBar>

            {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
            {/* {(!searchQuery) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )} */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Accounts;
