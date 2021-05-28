import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import ModalProvider from './context/Modal'
import UserSearchContext from './context/UserSearch'

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <UserSearchContext>
        <Provider store={store}>
          <App />
        </Provider>
      </UserSearchContext>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
