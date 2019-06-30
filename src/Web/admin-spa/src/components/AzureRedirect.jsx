import React, { Component } from 'react';

export default class AzureRedirect extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.location.href = "https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_signuporsignin&response_type=token&client_id=27fb84fe-4baf-4b6b-bfe7-f2d0638f2790&scope=27fb84fe-4baf-4b6b-bfe7-f2d0638f2790%20openid&state=D9aUT4AWYPbEmL2htHtfVmNTNUH3umtisNaNYP-ctCo%3D&redirect_uri=http://localhost:8090/login"
    }

    render() {
        return null;
    }
}