import { socket } from './socket';

import { addMember } from '../chatterSlice';

export const userJoinedRoom = dispatch => socket.on('user-joined-room', data => {

  dispatch(addMember({
    id: data.id,
    username: data.username
  }));

});
