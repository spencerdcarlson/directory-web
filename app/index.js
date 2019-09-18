import React from 'react';
import ReactDOM from 'react-dom';
import CSRF from './components/csrf'
import {DirectoryProvider, reducer, initialState} from './context/directory'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import LandingPage from './components/landing_page'

const App = () => {
  const props = { initialState, reducer };
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DirectoryProvider {...props} >
          <LandingPage />
          <CSRF/>
        </DirectoryProvider>
      </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'))
