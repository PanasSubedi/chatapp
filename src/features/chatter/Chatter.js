import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  getAuthenticated, authenticateUser,
  connectUserToBackend,
} from './chatterSlice';

import { MainScreen } from './components/MainScreen';
import { LoginScreen } from './components/LoginScreen';

export const Chatter = () => {

  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const authenticated = useSelector(getAuthenticated);

  const dispatch = useDispatch();

  const handleLogin = username => {
    if (username !== ''){

      dispatch(connectUserToBackend(username))
        .then(data => {
          if (data.payload === undefined || 'error' in data.payload){
            setLoginErrorMessage('Error: ' + data.payload['error'])
          }

          else {
            dispatch(authenticateUser(data.payload))
          }
        })

    }
  }

  return (
    <>
      {
        authenticated
        ?
        <MainScreen />
        :
        <LoginScreen handleLogin={handleLogin} loginErrorMessage={loginErrorMessage} />
      }
    </>
  )
}
