import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Avatar, Button, useTheme } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [isDiscoverClicked, setIsDiscoverClicked] = useState(location.pathname.includes('/posts/discover'));

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    history.go(0); // refresh page
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));

    // if user is on discover page, set isDiscoverClicked to true so that the discover link is highlighted
    setIsDiscoverClicked(location.pathname.includes('/posts/discover'));
  }, [location]);


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        <Link to="/posts/discover" style={{ textDecoration: 'none', color: isDiscoverClicked ? theme.palette.secondary.main : '#3f51b5' }}>Discover</Link>
        {user?.result ? (
          <div className={classes.profile}>
            <Link to={`/user/${user.result._id}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            </Link>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
