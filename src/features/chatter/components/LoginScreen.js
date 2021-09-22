import { useState } from 'react';

import {
  Backdrop,
  Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
  TextField, Button,
  Typography
} from '@material-ui/core';

export const LoginScreen = ({ handleLogin, loginErrorMessage }) => {

  const [username, setUsername] = useState('');

  return (
    <Backdrop open={true}>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To use this website, please enter your username here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            fullWidth
            onChange={event => setUsername(event.target.value)}
          />
          { loginErrorMessage !== '' && <Typography variant="caption" style={{color: 'red'}}>{ loginErrorMessage }</Typography>}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleLogin(username)}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  )
}
