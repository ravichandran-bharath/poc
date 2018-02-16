import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Test from './test';
import CRUD from './crud';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CRUD />, document.getElementById('root'));
registerServiceWorker();