import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  Grid,
  Typography,
  withWidth, Hidden
} from '@material-ui/core';

import { useMainStyles, useAppBarStyles,
        useMemberListStyles,
        useMessagesStyles, useMessageBarStyles } from '../styles/styles.js';

import { renderAppBar } from '../renders/renderAppBar';
import { renderMessages } from '../renders/renderMessages';
import { renderMembersList } from '../renders/renderMembersList';
import { renderMessageBar } from '../renders/renderMessageBar';

import {
  addMember, getMembers,
  getAuthenticatedUser,
  getMessages, sendMessage
} from '../chatterSlice';

import { userJoinedRoom } from '../sockets/userJoinedRoom';
import { userLeftRoom } from '../sockets/userLeftRoom';
import { receiveMessage } from '../sockets/receiveMessage';

const getSm = width => {

  if (width === 'xs' || width === 'sm'){
    return 12;
  }

  else {
    return 10;
  }
}

const MainScreenRender = ({ width }) => {

  const members = useSelector(getMembers);
  const messages = useSelector(getMessages);
  const authenticatedUser = useSelector(getAuthenticatedUser);

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {

    fetch('/api/users')
      .then(response => response.json())
      .then(data => {

        const members = data['items']

        members.forEach(member => {
          console.log('in main screen')
          dispatch(addMember({
            id: member._id,
            username: member.username
          }))
        })

      });

    userJoinedRoom(dispatch);
    userLeftRoom(dispatch);
    receiveMessage(dispatch);

  }, []);

  const handleMessageSend = messageText => {
    dispatch(
      sendMessage({
        message: messageText, sender: authenticatedUser
      })
    );
    setMessage('');
  }

  const sm = getSm(width);

  const classes = useMainStyles();
  return (
    <>
      { renderAppBar(useAppBarStyles(), authenticatedUser) }

      <Grid container spacing={4} className={classes.root}>

        <Grid item sm={sm}>
          { renderMessages(useMessagesStyles(), messages, authenticatedUser.username) }
          { renderMessageBar(useMessageBarStyles(), message, setMessage, handleMessageSend) }
        </Grid>

        <Hidden smDown>
          <Grid item sm={2}>
            <Typography variant="h6" className={classes.membersListHeader}>
              Members Online
            </Typography>
            { renderMembersList(useMemberListStyles(), members) }
          </Grid>
        </Hidden>

      </Grid>

    </>
  )
}

export const MainScreen = withWidth()(MainScreenRender);
