import React, { Component } from 'react';
import { getDevices, getUsers, addUserToDevice } from '../api';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

export default class DeviceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            users: [],
            administration: {
                macAddress: '',
                userId: ''
            }
        };
    }

    async componentDidMount() {
        const devices = await getDevices();
        const users = await getUsers();
        this.setState({ devices, users });
    }

    handleDeviceChange = ({ target }) => {
        const newAdministration = {
            ...this.state.administration,
            macAddress: target.value
        };
        this.setState({ administration: newAdministration });
    }

    handleUserChange = ({ target }) => {
        const newAdministration = {
            ...this.state.administration,
            userId: target.value
        };
        this.setState({ administration: newAdministration });
    }

    submit = async () => {
        const { administration, devices } = this.state;
        await addUserToDevice(administration.macAddress, { id: administration.userId});
        const newDevices = devices.filter(d => d.macAddress !== administration.macAddress);
        this.setState({ devices: newDevices, administration: { userId: '', macAddress: '' } });
    }

    render() {
        const { devices, users, administration } = this.state;
        return (
            <div>
                <Link to='/'><Icon>arrow_back</Icon></Link>
                <Select value={administration.macAddress} onChange={this.handleDeviceChange} inputProps={{ name: 'macAddress', id: 'macAddress' }}>
                    {devices.map(device => (
                        <MenuItem key={device.macAddress} value={device.macAddress}>{device.macAddress}</MenuItem>
                    ))}
                </Select>
                <Select value={administration.userId} onChange={this.handleUserChange} inputProps={{ name: 'id', id: 'id' }}>
                    {users.map(user => (
                        <MenuItem key={user.id} value={user.id}>{user.givenName} {user.familyName}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" color="primary" onClick={this.submit}>Associate user to device</Button>
            </div>
        )
    }
}