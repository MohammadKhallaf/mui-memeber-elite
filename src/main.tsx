import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router/index';
import store from './store/index';
import { themeOptions } from './theme';

const defaultTheme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={5}>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
