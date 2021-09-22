import { socket } from './sockets/socket';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  members: [],
  authenticated: false,
  authenticatedUser: null,
  rooms: [],
}

export const connectUserToBackend = createAsyncThunk(
  'chatter/connectUserToBackend',
  async (username) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    }).then(
      response => response.json()
    ).then(
      data => {
        return data;
      }
    );

    return response;
  }
)

export const disconnectUserFromBackend = createAsyncThunk(
  'chatter/disconnectUserFromBackend',
  async () => {
    socket.emit('logout');
  }
)

export const sendMessage = createAsyncThunk(
  'chatter/sendMessage',
  async (data) => {

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: data.message,
        sender: data.sender
      })
    }).then(
      response => response.json()
    ).then(
      data => {
        return data;
      }
    );

    return response;
  }
);

export const chatterSlice = createSlice({
  name: 'chatter',
  initialState,
  reducers: {
    addMember: (state, action) => {
      console.log('in slice')
      state.members.push(action.payload);
    },
    removeMember: (state, action) => {
      state.members = state.members.filter(member => member.id !== action.payload.id);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    authenticateUser: (state, action) => {
      state.authenticated = true;
      state.authenticatedUser = action.payload
    },
    logoutUser: (state) => {
      state.authenticated = false;
    }
  }
});

export const {
  addMember, removeMember,
  addMessage,
  authenticateUser, setAuthenticatedUser,
  addRoom
} = chatterSlice.actions;

export const getAuthenticatedUser = state => state.chatter.authenticatedUser;
export const getMembers = state => state.chatter.members;
export const getAuthenticated = state => state.chatter.authenticated;

export const getMessages = state => state.chatter.messages;
export const getRooms = state => state.chatter.rooms;

export default chatterSlice.reducer;
