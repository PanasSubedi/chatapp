import {
  Box,
  AppBar, Toolbar,
  Typography,
  IconButton, Button
} from '@material-ui/core';

import {
  Menu as MenuIcon
} from "@material-ui/icons";

export const renderAppBar = (classes, authenticatedUser) => (
  <AppBar
    position="relative"
    color="transparent"
    elevation={0}
  >
    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        The Chatter
      </Typography>


      <Typography>
        { authenticatedUser && authenticatedUser.username }
      </Typography>

      <Button color="primary">
        Logout
      </Button>

      <Box display={{xs: 'block', sm: 'none'}}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);
