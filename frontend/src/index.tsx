import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {ApolloProvider} from "@apollo/client";
import Apollo from "./Apollo";

ReactDOM.render(
  <ApolloProvider client={Apollo}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
