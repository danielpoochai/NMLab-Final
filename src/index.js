import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//modify
import BlockChainTest from './pages/BlockChainTest';
import AdminPage from './pages/AdminPage'


ReactDOM.render(<App style={{backgroundColor: 'rgb(36, 33, 33)', height:'100%'}}/>, document.getElementById('root'));
//ReactDOM.render(<BlockChainTest/>, document.getElementById('root'));
//ReactDOM.render(<AdminPage/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();