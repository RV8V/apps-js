import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'


const rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App /*state={store.getState()} dispatch={store.dispatch.bind(store)} store={store}*/ />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

rerenderEntireTree(/*store.getState()*/)

/*store.subscribe(() => {
  const state = store.getState()
  rerenderEntireTree(state)
})*/

//store._rerenderEntireTree(store.getState())

reportWebVitals();
