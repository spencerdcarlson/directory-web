import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import Home from './components/Home'
import { UserProvider, reducer, initialState} from "./context/user";

const App = () => {
  const props = { initialState, reducer };
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <UserProvider { ...props} >
            <Home />
          </UserProvider>
      </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'))
