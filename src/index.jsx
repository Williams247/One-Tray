import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './index.css';

const OneSourceSearch = () => (
    <React.Fragment>
        <Layout />
    </React.Fragment>
);

ReactDOM.render(<OneSourceSearch />, document.querySelector('#root'));