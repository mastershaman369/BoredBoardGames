import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#16A085' },
    secondary: { main: '#E07A5F' },
    background: { default: '#ffffff' },
    text: { primary: '#22223B', secondary: '#444' },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 500 },
    h2: { fontSize: '1.5rem', fontWeight: 500 },
  },
});

export default theme;
