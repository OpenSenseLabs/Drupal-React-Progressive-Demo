import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Form from './components/Form.jsx';
require('./style/style.scss');


ReactDOM.render(<App />, document.getElementById('react-example-1'));
ReactDOM.render(<Form />, document.getElementById('react-poc-drupal'));

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Form />, document.getElementById('form'));
