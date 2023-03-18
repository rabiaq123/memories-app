import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import EditScreen from './components/EditProfile/EditScreen';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Profile from './components/ProfilePage/Profile';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search=:searched" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/user/:id" exact component={Profile} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          {/* <Route path="/user/:id/edit" exact component={EditScreen} /> */}
          <Route path="/edit" exact component={EditScreen} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
