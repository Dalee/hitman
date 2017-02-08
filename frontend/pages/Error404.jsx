import React from 'react';
import App from '../containers/App';

class Error404 extends React.Component {
    render() {
        return (
            <App>
                <h1>404</h1>
                <p>Oops, something went wrong...</p>
            </App>
        )
    }
}

export default Error404;
