import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import EditScreen from './components/EditProfile/EditScreen';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Profile from './components/ProfilePage/Profile';
import Discover from './components/Discover/Discover'
import Accounts from './components/Accounts/Accounts';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { authData } = useSelector((state) => state.auth); // authData is a prop in the auth reducer's return value 
  // console.log(authData)

  // pages/components that can be accessed without logging in: Auth, User Profiles, Discover, Tag pages
  // pages/components that can only be accessed after logging in: User Feed, Post/Account Search results, PostDetails, EditScreen

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <Redirect to="/posts" />)} />
          <Route path="/posts" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <Home />)} />
          <Route path="/posts/search" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <Home />)} />
          <Route path="/posts/discover" exact component={Discover} />
          <Route path="/posts/:id" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <PostDetails />)} />
          <Route path="/accounts" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <Accounts />)} />
          <Route path="/accounts/:searchUser" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <Accounts />)}/>
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/user/:id" exact component={Profile} />
          <Route path="/auth" exact component={() => (!authData && !user ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path="/edit" exact component={EditScreen} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
