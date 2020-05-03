import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import App from './components/App'
import { UserProvider, reducer, initialState} from "./context/user";

const Dom = () => {
  const props = { initialState, reducer };
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <UserProvider { ...props} >
            <App />
          </UserProvider>
      </ThemeProvider>
    );
};

ReactDOM.render(<Dom />, document.getElementById('app'))
