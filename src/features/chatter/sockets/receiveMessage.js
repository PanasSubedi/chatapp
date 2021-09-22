import { socket } from './socket';

import { addMessage } from '../chatterSlice';

export const receiveMessage = dispatch => socket.on('receive-message', data => {

  dispatch(addMessage({
    timestamp: data.timestamp,
    sender: data.sender.username,
    message: data.message.trim()
  }));

});
