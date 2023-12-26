import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { BrowserRouter,Routes, Route,HashRouter } from "react-router-dom";
import HomeStatus from './Routes/HomeStatus';
import Mainpage from './Routes/Mainpage';
import Login from './Routes/Login';
import CheckIn from './Routes/CheckIn'

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  typography: {
    fontFamily: 'Kanit, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Kanit';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Kanit'), local('Kanit-Regular'), url(fonts/Kanit-Regular.ttf) format('kanit');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});
root.render(
  <ThemeProvider theme={theme}>
  
  <React.StrictMode>
  <BrowserRouter>
      <Routes >
      <Route exact path="/" element={<Mainpage/>} />
        <Route path="/status" element={<HomeStatus/>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/checkin" element={<CheckIn/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
