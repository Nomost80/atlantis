import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';
import DeviceList from './components/DeviceList';
import UserList from './components/UserList';

const Router = () => (
    <BrowserRouter>
        <Route path='/login' exact component={Login}/>
        <PrivateRoute path='/' exact component={Home}/>
        <PrivateRoute path='/users' exact component={UserList}/>
        <PrivateRoute path='/devices' exact component={DeviceList}/>
        {/*<PrivateRoute component={UserList}/>*/}
    </BrowserRouter>
);

export default Router;