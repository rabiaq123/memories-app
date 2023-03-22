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

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <Redirect to="/posts" />)} />
          <Route path="/posts" exact component={() => (!authData && !user ? <Redirect to="/auth" /> : <Home />)} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/discover" exact component={Discover} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/user/:id" exact component={Profile} />
          <Route path="/auth" exact component={() => (!authData && !user ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path="/edit" exact component={EditScreen} />
          <Route path="/accounts" exact component={Accounts} />
          <Route path="/accounts/:searchUser" exact component={Accounts}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
