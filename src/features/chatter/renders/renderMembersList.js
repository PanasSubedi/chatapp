import {
  List, ListItem, ListItemText
} from '@material-ui/core';

export const renderMembersList = (classes, members) => (
  <List
    component="nav"
    aria-label="room-list"
  >
    { members.map(member => (
      <ListItem key={member.id}>
        <ListItemText
          primary={member.username}
        />
      </ListItem>
    )) }
  </List>
);
