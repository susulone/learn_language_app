/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalProvider } from './contexts/Globals';
import { StylesProvider } from './contexts/Styles';
import App from './App';

import theme from './styles/ThemeCustomization';
import '@fontsource/space-mono/700.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/500.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <GlobalProvider>
        <StylesProvider>
          <App />
        </StylesProvider>
      </GlobalProvider>
    </ChakraProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
