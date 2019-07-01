import React, { Component } from 'react';
import { getUsers, getDevices, addDeviceToUser } from '../api';
import User from './User';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';


export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            devices: []
        };
    }

    async componentDidMount() {
        const users = await getUsers();
        const devices = await getDevices();
        this.setState({ users, devices });
    }

    handleAddDevice = async (userId, newDevice) => {
        const { users, devices } = this.state;
        await addDeviceToUser(userId, newDevice);
        const userUpdated = users.find(u => u.id === userId);
        console.log('user updated: ', userUpdated)
        const newUser = {
            ...userUpdated,
            devices: [...userUpdated.devices, newDevice]
        };
        console.log('new user: ', newUser)
        const newUsers = [...users.filter(u => u.id !== userId), newUser];
        const newDevices = devices.filter(d => d.macAddress !== newDevice.macAddress);
        this.setState({ users: newUsers, devices: newDevices });
    }

    render() {
        return (
            <div>
                <Link to='/'><Icon>arrow_back</Icon></Link>
                {this.state.users.map(user => <User key={user.id} user={user} devices={this.state.devices} onClick={this.handleAddDevice}/>)}
            </div>
        )
    }
}