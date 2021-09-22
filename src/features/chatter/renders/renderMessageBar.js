import {
  Grid,
  TextField,
  IconButton
} from '@material-ui/core';

import {
  Send as SendIcon
} from "@material-ui/icons";

export const renderMessageBar = (classes, message, setMessage, handleMessageSend) => (
  <Grid container className={classes.messageBarContainer}>
    <Grid item sm={11}>
      <TextField
        label="Your message here"
        className={classes.messageBar}
        value={message}
        onChange={event => setMessage(event.target.value)}
      />
    </Grid>
    <Grid item sm={1} className={classes.sendButton}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => handleMessageSend(message)}
      >
        <SendIcon />
      </IconButton>
    </Grid>
  </Grid>
)
