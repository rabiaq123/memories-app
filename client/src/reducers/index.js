import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import user from './user';
import secondaryuser from './secondaryuser';

// reducer function accepts the current state and an action as arguments, and returns a new state result

export const reducers = combineReducers({ posts, auth, user, secondaryuser });
