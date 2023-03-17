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
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openProfile}
      >
        <center>
          <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
          <Typography variant="h6">{user.name}</Typography>
        </center>
      </ButtonBase>
    </Card>
  );
};

export default Account;
