import {
  Box,
  Typography,
  Tooltip
} from '@material-ui/core';

const getTimeByTimestamp = timestamp => {
  const date = new Date(timestamp * 1000)
  return date.getHours() + ":" + date.getMinutes();
}

export const renderMessages = (classes, messages, selfUsername) => (
  <Box className={`${classes.messageContainer}`}>
    { messages.map(message => {

      let messageClass;
      if (selfUsername === message.sender){
        messageClass = 'messageBoxSent'
      }

      else {
        messageClass = 'messageBoxReceived'
      }

      return (
        <Tooltip
          title={"Sent by " + message.sender + " at " + getTimeByTimestamp(message.timestamp)}
          placement="bottom-end"
          key={message.timestamp}
        >
          <Box
            className={`${classes.messageBox} ${classes[messageClass]}`}
          >
            <Typography>
              { message.message }
            </Typography>
            <Typography variant="caption">
              by { message.sender }
            </Typography>
          </Box>
        </Tooltip>
      )
    }) }
  </Box>
);
