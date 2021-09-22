import React from 'react';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import { Chatter } from './features/chatter/Chatter';

function App() {

  const theme = createTheme({
    typography:{
      fontFamily: ['Asap', 'sans-serif'].join(',')
    }
  });

  theme.typography.h6 = {
    fontFamily: ['Zen Loop', 'cursive'].join(','),
  }

  return (
    <ThemeProvider theme={theme}>
      <Chatter />
    </ThemeProvider>
  );
}

export default App;
