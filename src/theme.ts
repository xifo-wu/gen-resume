import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      // main: '#2065d1',
      main: 'rgb(32, 101, 209)',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: 'rgb(255, 48, 48)',
    },
    background: {
      // default: '#f5f5f7'
    }
  },
});

export default theme;
