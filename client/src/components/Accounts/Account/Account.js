import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Avatar} from '@material-ui/core/';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Account = ({ user }) => {
  const history = useHistory();
  const classes = useStyles();

  const openProfile = (e) => {
    history.push(`/user/${user._id}`);
  };

  return (
    <div className={classes.card}>
        <center>
          <Avatar onClick={openProfile} className={classes.avatar} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
          <Typography onClick={openProfile} variant="h6" className={classes.title}>{user.name}</Typography>
        </center>
    </div>
  );
};

export default Account;
