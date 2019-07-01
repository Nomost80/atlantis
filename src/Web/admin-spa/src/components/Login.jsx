import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as qs from 'query-string';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        };
    }

    componentDidMount() {
        const parsedUrl = qs.parse(window.location.href);
        localStorage.setItem('access_token', parsedUrl.access_token);
        localStorage.setItem('token_type', parsedUrl.token_type);
        this.setState({ logged: true });
    }

    render() {
        const redirectTo = localStorage.getItem('redirect_to') || '/';
        return this.state.logged ? <Redirect to={redirectTo}/> : null;
    }
}