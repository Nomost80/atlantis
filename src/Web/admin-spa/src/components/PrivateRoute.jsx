import React from 'react';
import { Route } from 'react-router-dom';

import AzureRedirect from './AzureRedirect';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('access_token');
    const tokenType = localStorage.getItem('token_type');
    const authenticated = token && tokenType;

    return (
        <Route {...rest} render={props => (
            authenticated ? <Component {...props} /> : <AzureRedirect/>
        )}/>
    );
}

export default PrivateRoute;