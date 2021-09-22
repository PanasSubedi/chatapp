import { makeStyles } from '@material-ui/core/styles';

const useMainStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  roomListHeader: {
    textAlign: 'right',
    fontSize: 25,
  },
  membersListHeader: {
    fontSize: 25,
  },
}));

const useAppBarStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 40,
  },
}));

const useRoomListStyles = makeStyles(() => ({
  roomListText: {
    textAlign: 'right',
  },
}));

const useMemberListStyles = makeStyles(() => ({
  
}));

const useMessagesStyles = makeStyles(() => ({
  messageContainer: {
    height: window.innerHeight - 175,
    overflowY: 'auto'
  },
  messageBox: {
    margin: '15px 5px',
    padding: '15px',
    borderRadius: '5px',
  },
  messageBoxSent: {
    border: '2px solid #3d3',
  },
  messageBoxReceived: {
    textAlign: 'right',
    border: '2px solid #ddd',
  }
}));

const useMessageBarStyles = makeStyles(() => ({
  messageBarContainer: {
    width: '100%',
    margin: '10px 0 0 0',
    padding: '10px 5px'
  },
  messageBar: {
    width: '100%'
  },
  sendButton: {
    textAlign: 'right'
  }
}));

export { useMainStyles, useAppBarStyles,
        useRoomListStyles, useMemberListStyles,
        useMessagesStyles, useMessageBarStyles };
