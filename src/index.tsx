import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app';
import { AppProviders } from 'app-providers';
import 'styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
