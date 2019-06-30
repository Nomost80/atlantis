import axios from 'axios';

const webservice = axios.create({
    baseURL: 'http://192.168.43.218:8081',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
    }
});

webservice.interceptors.response.use(response => {
    console.log('Ajax response: ', response);
    return response.data;
}, response => {
    if (response.status === 401) {
        if (localStorage.getItem('access_token') & localStorage.getItem('token_type')) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('token_type');
            window.location.href = "https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_signuporsignin&response_type=token&client_id=27fb84fe-4baf-4b6b-bfe7-f2d0638f2790&scope=27fb84fe-4baf-4b6b-bfe7-f2d0638f2790%20openid&state=D9aUT4AWYPbEmL2htHtfVmNTNUH3umtisNaNYP-ctCo%3D&redirect_uri=http://localhost:8090/login"
        }
    }
})

export const getDevices = () => webservice.get('/devices');

export const getUsers = () => webservice.get('/users');

export const addDeviceToUser = (userId, device) => webservice.post('/users/' + userId + '/devices', device);

export const addUserToDevice = (deviceId, user) => webservice.post('/devices' + deviceId + '/users', user);