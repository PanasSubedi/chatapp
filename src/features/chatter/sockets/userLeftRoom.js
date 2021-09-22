import { socket } from './socket';

import { removeMember } from '../chatterSlice';

export const userLeftRoom = dispatch => socket.on('userLeftRoom', data => {
  dispatch(removeMember({id: data.id}));
});
